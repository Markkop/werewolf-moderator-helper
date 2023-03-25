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
    // Implement role-specific actions here
    // For example:
    // if (currentRole.name === 'Doctor') {
    // healPlayer(targetId);
    // }
    handleNextRole();
  };

  const handleFinishNightActions = () => {
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
