import { Player } from '../interfaces'
import { getPlayerTag } from './format'
import { getPlayersByActionType } from './players'

export function executeActions(
  players: Player[],
  addItemToHistory: (item: string) => void,
  addItemToAnnouncement: (item: string) => void
) {
  let historyItems: string[] = [];
  let announcementItems: string[] = [];

  const updatedPlayers = players.map((player) => {
    const targettedBy = player.turn?.targettedBy;
    if (!targettedBy?.length) return player;
    const healers = getPlayersByActionType(players, targettedBy, 'heal');
    const killers = getPlayersByActionType(players, targettedBy, 'kill');
    let isDead = player.isDead;

    const playerTag = getPlayerTag(player);

    killers.forEach((killer) => {
      const killerTag = getPlayerTag(killer);
      if (healers[0]) {
        healers.forEach((healer) => {
          const healerTag = getPlayerTag(healer);
          historyItems.push(
            `❤️ ${playerTag} was attacked by ${killerTag}, but healed by ${healerTag}`
          );
        });
        return;
      }
      isDead = true;
      historyItems.push(`🔪 ${playerTag} was killed by ${killerTag}  `);
      announcementItems.push(
        `${player.name} was killed and they were a ${player.role.name}!`
      );
    });

    healers.forEach((healer) => {
      if (killers[0]) return;
      const healerTag = getPlayerTag(healer);
      historyItems.push(
        `❤️ ${playerTag} was healed by ${healerTag} (not attacked)`
      );
    });

    return { ...player, isDead };
  });

  const investigationResults = players.map((player) => {
    const targettedBy = player.turn?.targettedBy;
    if (!targettedBy?.length) return null;
    const investigators = getPlayersByActionType(
      players,
      targettedBy,
      'investigate'
    );

    return investigators.map((investigator) => {
      const investigatorTag = getPlayerTag(investigator);
      const playerTag = getPlayerTag(player);

      if (player.role.alignment === 'Good') {
        return `🔎 ${investigatorTag} investigated ${playerTag} and found them to be 👍`;
      }
      return `🔎 ${investigatorTag} investigated ${playerTag} and found them to be 👎`;

    });
  });

  const flattenedInvestigationResults = investigationResults
    .flat()
    .filter((result) => result !== null);

  historyItems.push(...flattenedInvestigationResults);

  historyItems.forEach(addItemToHistory);
  announcementItems.forEach(addItemToAnnouncement);
  if (!announcementItems.length) {
    addItemToHistory('📢 Nothing happened during the night.')
  }
  announcementItems.forEach((item) => addItemToHistory(`📢 ${item}`))

  return updatedPlayers;
}




// if (!announcement.length) {
//   addItemToHistory('Nothing happened during the night.')
// }
