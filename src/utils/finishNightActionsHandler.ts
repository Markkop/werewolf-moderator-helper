import { Player } from "../interfaces";
import { getPlayerTag } from "./format";
import { getPlayersByActionType, setStatusForPlayers } from "./players";

export function finishNightActionsHandler(players: Player[], addItemToCurrentNightSummary: (item: string) => void) {
  const killingPlayers = getPlayersByActionType(players, "kill");
  const healingPlayers = getPlayersByActionType(players, "heal");

  setStatusForPlayers(players, "killer", killingPlayers);
  setStatusForPlayers(players, "healer", healingPlayers);

  players.forEach((player) => {
    const playerTag = getPlayerTag(player);
    const healerTag = getPlayerTag(player.status.healer);
    const killerTag = getPlayerTag(player.status.killer);
    if (player.status.healer && player.status.killer) {
      addItemToCurrentNightSummary(
        `${playerTag} was attacked by ${killerTag}, but healed by ${healerTag}`
      )
      return
    }

    if (player.status.healer) {
      addItemToCurrentNightSummary(
        `${playerTag} was healed by ${healerTag} (not attacked)`
      )
      return
    }

    if (player.status.killer) {
      addItemToCurrentNightSummary(
        `${playerTag} was kiled by ${killerTag} `
      )
      player.isDead = true;
      return
    }
  })

  return players;
}