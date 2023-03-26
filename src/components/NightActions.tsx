import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { Player, RoleAction } from "../interfaces";
import { handleDoctorAction } from "../utils/actionHandlers/doctor";
import { handleMafiosoAction } from "../utils/actionHandlers/mafioso";
import { handleSheriffAction } from "../utils/actionHandlers/sheriff";
import { finishNightActionsHandler } from "../utils/finishNightActionsHandler";
import {
  filterAlivePlayers,
  filterPlayersWithNightAction,
  orderPlayersByRole,
  selectAndFilterMafiosos,
} from "../utils/players";

export default function NightActions() {
  const { players, updatePlayer, setGameState, addItemToCurrentNightSummary } =
    useGameContext();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const alivePlayers = filterAlivePlayers(players);
  const playersWithNightActions = filterPlayersWithNightAction(alivePlayers);
  const actingPlayers = selectAndFilterMafiosos(playersWithNightActions);
  const orderedPlayers = orderPlayersByRole(actingPlayers);

  const currentPlayer = orderedPlayers[currentPlayerIndex];

  const handleNextPlayer = () => {
    setCurrentPlayerIndex(currentPlayerIndex + 1);
  };

  const handleAction = (targetId: number) => {
    const mapRoleToActionHandler: Record<
      string,
      (players: Player[], targetId: number) => RoleAction
    > = {
      Mafioso: handleMafiosoAction,
      Doctor: handleDoctorAction,
      Sheriff: handleSheriffAction,
    };

    const actionHandler = mapRoleToActionHandler[currentPlayer.role.name];
    const action = actionHandler(players, targetId);

    addItemToCurrentNightSummary(
      `${currentPlayer.name} (${currentPlayer.role.name}) selected ${
        players.find((player) => player.id === targetId)?.name
      }`
    );
    currentPlayer.role.action = action;
    updatePlayer(currentPlayer);
    handleNextPlayer();
  };

  const handleFinishNightActions = () => {
    const afterNightPlayers = finishNightActionsHandler(
      players,
      addItemToCurrentNightSummary
    );

    afterNightPlayers.forEach((player) => {
      if (player.role.action) delete player.role.action;
      if (player.status) delete player.status;
      updatePlayer(player);
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
      <p>{currentPlayer.role.description}</p>
      <ul>
        {alivePlayers.map((player) => (
          <li key={player.id}>
            <button
              onClick={() => handleAction(player.id)}
              disabled={
                currentPlayer.role.name === "Mafioso" &&
                player.role.faction === "Mafia"
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
