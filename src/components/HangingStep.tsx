import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";

export default function HangingStep() {
  const { players, updatePlayer, setGameState } = useGameContext();
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);

  const handleSelectPlayer = (playerId: number) => {
    setSelectedPlayerId(playerId);
  };

  const handleHangPlayer = () => {
    if (selectedPlayerId) {
      const playerToHang = players.find(
        (player) => player.id === selectedPlayerId
      );
      if (playerToHang) {
        playerToHang.isDead = true;
        updatePlayer(playerToHang);
      }
    }
    setSelectedPlayerId(null);
    setGameState("nightActions");
  };

  const alivePlayers = players.filter((player) => !player.isDead);

  return (
    <div>
      <h2>Hanging Step</h2>
      <ul>
        {alivePlayers.map((player) => (
          <li key={player.id}>
            {player.name} {` (${player.role.name})`}
            <button onClick={() => handleSelectPlayer(player.id)}>
              Select
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleHangPlayer}>Hang selected player</button>
      <button onClick={() => setGameState("nightActions")}>Skip Hanging</button>
    </div>
  );
}
