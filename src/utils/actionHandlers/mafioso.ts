import { Player, ActionTarget } from "../../interfaces";
import { filterAlivePlayers, getPlayersByFaction, updatePlayersFromAction } from "../players";

export function handleMafiosoAction(
  players: Player[],
  targetId: number,
  currentPlayer: Player,
  updatePlayer: (player: Player) => void) {
  const alivePlayers = filterAlivePlayers(players);
  const mafiaMembers = getPlayersByFaction(alivePlayers, "Mafia");

  if (mafiaMembers.find((mafiaMember) => mafiaMember.id === targetId)) {
    return;
  }

  updatePlayersFromAction(players, currentPlayer, updatePlayer, targetId, "kill");
};