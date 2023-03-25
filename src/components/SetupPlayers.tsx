import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";

export default function SetupPlayers() {
  const { players, addPlayer, removePlayer, setGameState } = useGameContext();
  const [newPlayerName, setNewPlayerName] = useState("");

  const handleAddPlayer = () => {
    addPlayer(newPlayerName);
    setNewPlayerName("");
  };

  const handleRemovePlayer = (playerId: number) => {
    removePlayer(playerId);
  };

  const handleNextStep = () => {
    setGameState("setupRoles");
  };

  return (
    <div>
      <h2>Setup Players</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name}{" "}
            <button onClick={() => handleRemovePlayer(player.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newPlayerName}
        onChange={(e) => setNewPlayerName(e.target.value)}
      />
      <button onClick={handleAddPlayer}>Add player</button>
      <button onClick={handleNextStep}>Next step</button>
    </div>
  );
}
