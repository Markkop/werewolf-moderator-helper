import { Player } from "../../interfaces";
import { updatePlayersFromAction } from "../players";

export function handleDoctorAction(
  players: Player[],
  targetId: number,
  currentPlayer: Player,
  updatePlayer: (player: Player) => void) {
  updatePlayersFromAction(players, currentPlayer, updatePlayer, targetId, "heal");
};