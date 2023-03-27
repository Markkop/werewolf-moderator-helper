import { Player } from "../../interfaces";
import { updatePlayersFromAction } from "../players";

export function handleDoctorAction(
  players: Player[],
  targetId: number,
  currentPlayer: Player,
  updatePlayersByMapFn: (mapFn: (player: Player) => Player) => void) {
  updatePlayersFromAction(players, currentPlayer, updatePlayersByMapFn, targetId, "heal");
};