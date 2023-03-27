import { Player } from "../interfaces";
import { getPlayerTag } from "./format";
import { getPlayersByActionType } from "./players";

export function executeActions(players: Player[], addItemToHistory: (item: string) => void, addItemToAnnouncement: (item: string) => void) {
  // Resolve killing and healing actions
  players.forEach((player) => {
    const targettedBy = player.turn?.targettedBy || [];
    const healers = getPlayersByActionType(players, targettedBy, "heal");
    const killers = getPlayersByActionType(players, targettedBy, "kill");

    const playerTag = getPlayerTag(player);

    killers.forEach((killer) => {
      const killerTag = getPlayerTag(killer);
      if (healers[0]) {
        healers.forEach((healer) => {
          const healerTag = getPlayerTag(healer);
          addItemToHistory(
            `❤️ ${playerTag} was attacked by ${killerTag}, but healed by ${healerTag}`
          )
        })
        return
      }
      player.isDead = true;
      addItemToHistory(
        `🔪 ${playerTag} was killed by ${killerTag} `
      )
      addItemToAnnouncement(
        `${player.name} was killed and they were a ${player.role.name}!`
      )
    })

    healers.forEach((healer) => {
      if (killers[0]) return
      const healerTag = getPlayerTag(healer);
      addItemToHistory(
        `❤️ ${playerTag} was healed by ${healerTag} (not attacked)`
      )
    })
  })

  // Resolve investigation actions
  players.forEach((player) => {
    if (player.role.name !== "Sheriff") return
    const target = players.find((otherPlayer) => otherPlayer.id === player.turn?.target?.targetId);
    if (!target) return;

    const playerTag = getPlayerTag(player);
    if (target?.role.alignment === "Good") {
      addItemToHistory(
        `🔎 ${playerTag} investigated ${getPlayerTag(target)} and found them to be 👍`
      )
    } else {
      addItemToHistory(
        `🔎 ${playerTag} investigated ${getPlayerTag(target)} and found them to be 👎`
      )
    }
  })

  return players;
}