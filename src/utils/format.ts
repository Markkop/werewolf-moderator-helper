import { Player } from "../interfaces";

export function getPlayerTag(player: Player) {
  return `${player?.name} (${player?.role?.name})`
}