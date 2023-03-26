import { Player } from "../interfaces";
import { getPlayerTag } from "./format";
import { getPlayersByActionType, setStatusForPlayers } from "./players";

export function finishNightActionsHandler(players: Player[], addItemToHistory: (item: string) => void, addItemToAnnouncement: (item: string) => void) {
  const killingPlayers = getPlayersByActionType(players, "kill");
  const healingPlayers = getPlayersByActionType(players, "heal");

  setStatusForPlayers(players, "killer", killingPlayers);
  setStatusForPlayers(players, "healer", healingPlayers);

  // Resolve killing and healing actions
  players.forEach((player) => {
    const playerTag = getPlayerTag(player);
    const healerTag = getPlayerTag(player.status?.healer);
    const killerTag = getPlayerTag(player.status?.killer);
    if (player.status?.healer && player.status?.killer) {
      addItemToHistory(
        `${playerTag} was attacked by ${killerTag}, but healed by ${healerTag}`
      )
      return
    }

    if (player.status?.healer) {
      addItemToHistory(
        `${playerTag} was healed by ${healerTag} (not attacked)`
      )
      return
    }

    if (player.status?.killer) {
      player.isDead = true;
      addItemToHistory(
        `☠️ ${playerTag} was kiled by ${killerTag} `
      )
      addItemToAnnouncement(
        `☠️ ${player.name} was killed and they were a ${player.role.name}!`
      )
      return
    }
  })

  // Resolve investigation actions
  players.forEach((player) => {
    if (player.role.name !== "Sheriff") return
    const target = players.find((otherPlayer) => otherPlayer.id === player.role.action?.targetId);
    if (!target) return;

    const playerTag = getPlayerTag(player);
    if (target?.role.alignment === "Good") {
      addItemToHistory(
        `${playerTag} investigated ${getPlayerTag(target)} and found them to be 👍`
      )
    } else {
      addItemToHistory(
        `${playerTag} investigated ${getPlayerTag(target)} and found them to be 👎`
      )
    }
  })

  return players;
}