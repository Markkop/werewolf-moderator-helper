import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";

export default function NightActions() {
  const { players, updatePlayer, setGameState, addItemToCurrentNightSummary } =
    useGameContext();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const alivePlayers = players.filter((player) => !player.isDead);
  const playersWithNightActions = alivePlayers.filter(
    (player) => player.role.name !== "Townie"
  ); // mafioso first, then doctor, then sheriff
  const orderedPlayers = playersWithNightActions.sort((a, b) => {
    if (a.role.name === "Mafioso") {
      return -1;
    } else if (b.role.name === "Mafioso") {
      return 1;
    } else if (a.role.name === "Doctor") {
      return -1;
    } else if (b.role.name === "Doctor") {
      return 1;
    } else if (a.role.name === "Sheriff") {
      return -1;
    } else if (b.role.name === "Sheriff") {
      return 1;
    }
    return 0;
  });

  const currentPlayer = orderedPlayers[currentPlayerIndex];

  const handleNextPlayer = () => {
    setCurrentPlayerIndex(currentPlayerIndex + 1);
  };

  const handleAction = (targetId: number) => {
    addItemToCurrentNightSummary(
      `${currentPlayer.name} (${currentPlayer.role.name}) selected ${
        players.find((player) => player.id === targetId)?.name
      }`
    );
    if (currentPlayer.role.name === "Doctor") {
      currentPlayer.role.action = { type: "heal", targetId };
    } else if (currentPlayer.role.name === "Sheriff") {
      currentPlayer.role.action = { type: "investigate", targetId };
    } else if (currentPlayer.role.name === "Mafioso") {
      const mafiosos = alivePlayers.filter(
        (player) => player.role.name === "Mafioso"
      );
      mafiosos.forEach((mafioso) => {
        mafioso.role.action = { type: "kill", targetId };
        updatePlayer(mafioso);
      });
      handleNextPlayer();
      return;
    }
    updatePlayer(currentPlayer);
    handleNextPlayer();
  };

  const handleFinishNightActions = () => {
    const actions = players.map((player) => player.role.action);
    const killAction = actions.find((action) => action?.type === "kill");
    const killer = players.find(
      (player) => player.role.action?.type === "kill"
    );
    const healAction = actions.find((action) => action?.type === "heal");
    const healer = players.find(
      (player) => player.role.action?.type === "heal"
    );

    if (healAction) {
      addItemToCurrentNightSummary(
        `${healer.name} (${healer.role.name}) healed ${
          players.find((player) => player.id === healAction.targetId)?.name
        }`
      );
    }

    if (
      killAction &&
      (!healAction ||
        (healAction && killAction.targetId !== healAction.targetId))
    ) {
      const killedPlayer = players.find(
        (player) => player.id === killAction.targetId
      );
      if (killedPlayer) {
        const killedBy = players.find(
          (player) => player.role.action?.type === "kill"
        );
        addItemToCurrentNightSummary(
          `${killedPlayer.name} was killed by ${
            killedBy.name
          } ${`(${killedBy.role.name})`}`
        );
        killedPlayer.isDead = true;
        updatePlayer(killedPlayer);
      }
    }

    players.forEach((player) => {
      if (player.role.action) {
        delete player.role.action;
        updatePlayer(player);
      }
    });

    setGameState("moderatorAnnouncement");
  };

  if (!currentPlayer || currentPlayerIndex >= alivePlayers.length) {
    return (
      <div>
        <h2>Night Actions</h2>
        <button onClick={handleFinishNightActions}>Finish Night Actions</button>
      </div>
    );
  }

  return (
    <div>
      <h2>
        {`Night Actions - ${currentPlayer.name} (${currentPlayer.role.name})`}
      </h2>
      <ul>
        {alivePlayers.map((player) => (
          <li key={player.id}>
            <button onClick={() => handleAction(player.id)}>
              {`${player.name} (${player.role.name})`}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleNextPlayer}>Skip</button>
    </div>
  );
}
