import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { RoleActionType } from "../interfaces";

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
    const action = getActionForRole(currentPlayer.role.name, targetId);

    if (currentPlayer.role.name === "Mafioso") {
      const mafiosos = alivePlayers.filter(
        (player) => player.role.name === "Mafioso"
      );

      if (mafiosos.find((mafioso) => mafioso.id === targetId)) {
        return;
      }

      mafiosos.forEach((mafioso) => {
        mafioso.role.action = action;
        updatePlayer(mafioso);
      });
      handleNextPlayer();

      addItemToCurrentNightSummary(
        `${currentPlayer.name} (${currentPlayer.role.name}) selected ${
          players.find((player) => player.id === targetId)?.name
        }`
      );
      return;
    }

    currentPlayer.role.action = action;
    updatePlayer(currentPlayer);
    handleNextPlayer();
  };

  const getActionForRole = (
    roleName: string,
    targetId: number
  ): { type: RoleActionType; targetId: number } => {
    if (roleName === "Doctor") {
      return { type: "heal", targetId };
    }

    if (roleName === "Sheriff") {
      return { type: "investigate", targetId };
    }

    if (roleName === "Mafioso") {
      return { type: "kill", targetId };
    }

    throw new Error(`Unsupported role: ${roleName}`);
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

  // disabled if the current player is mafioso and the target options are mafiosos

  return (
    <div>
      <h2>
        {`Night Actions - ${currentPlayer.name} (${currentPlayer.role.name})`}
      </h2>
      <ul>
        {alivePlayers.map((player) => (
          <li key={player.id}>
            <button
              onClick={() => handleAction(player.id)}
              disabled={
                currentPlayer.role.name === "Mafioso" &&
                player.role.name === "Mafioso"
              }
            >
              {`${player.name} (${player.role.name})`}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleNextPlayer}>Skip</button>
    </div>
  );
}
