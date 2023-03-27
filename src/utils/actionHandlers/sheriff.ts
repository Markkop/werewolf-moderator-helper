import { Player, ActionTarget } from "../../interfaces";
import { updatePlayersFromAction } from "../players";

export function handleSheriffAction(
  players: Player[],
  targetId: number,
  currentPlayer: Player,
  updatePlayer: (player: Player) => void) {
  updatePlayersFromAction(players, currentPlayer, updatePlayer, targetId, "investigate")
};
