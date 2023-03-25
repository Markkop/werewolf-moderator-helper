import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";

export default function NightActions() {
  const { players, updatePlayer, setGameState } = useGameContext();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const alivePlayers = players.filter((player) => !player.isDead);
  const rolesWithActions = alivePlayers.filter(
    (player) => player.role.name !== "Townie"
  );
  const currentRole = rolesWithActions[currentRoleIndex];

  const handleNextRole = () => {
    setCurrentRoleIndex(currentRoleIndex + 1);
  };

  const handleAction = (targetId: number) => {
    if (currentRole.role.name === "Doctor") {
      currentRole.role.action = { type: "heal", targetId };
    } else if (currentRole.role.name === "Sheriff") {
      currentRole.role.action = { type: "investigate", targetId };
    } else if (currentRole.role.name === "Mafioso") {
      currentRole.role.action = { type: "kill", targetId };
    }
    updatePlayer(currentRole);
    handleNextRole();
  };

  const handleFinishNightActions = () => {
    const actions = players.map((player) => player.role.action);
    const killAction = actions.find((action) => action?.type === "kill");
    const healAction = actions.find((action) => action?.type === "heal");
    if (
      killAction &&
      (!healAction ||
        (healAction && killAction.targetId !== healAction.targetId))
    ) {
      const killedPlayer = players.find(
        (player) => player.id === killAction.targetId
      );
      if (killedPlayer) {
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

    setCurrentRoleIndex(0);
    setGameState("moderatorAnnouncement");
  };

  if (!currentRole || currentRoleIndex >= rolesWithActions.length) {
    return (
      <div>
        <h2>Night Actions</h2>
        <button onClick={handleFinishNightActions}>Finish Night Actions</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Night Actions - {currentRole.role.name}</h2>
      <ul>
        {alivePlayers.map((player) => (
          <li key={player.id}>
            {player.name}{" "}
            <button onClick={() => handleAction(player.id)}>Select</button>
          </li>
        ))}
      </ul>
      <button onClick={handleNextRole}>Skip</button>
    </div>
  );
}
