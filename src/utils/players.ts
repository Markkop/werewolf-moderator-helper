import { roleOrder } from "../data/existingRoles";
import { Faction, Player } from "../interfaces";

export function filterAlivePlayers(players: Player[]) {
  return players.filter((player) => !player.isDead);
}

export function filterPlayersWithNightAction(players: Player[]) {
  return players.filter((player) => player.role.hasNightAction);
}

export function selectAndFilterMafiosos(players: Player[]) {
  const mafiosos = players.filter((player) => {
    return player.role.name === "Mafioso";
  });

  if (mafiosos.length > 1) {
    const randomMafiosoIndex = Math.floor(Math.random() * mafiosos.length);
    const randomMafioso = mafiosos[randomMafiosoIndex];
    players.splice(
      players.indexOf(randomMafioso),
      1
    );
  }

  return players
}

export function orderPlayersByRole(players: Player[]) {
  return players.sort((a, b) => {
    const aIndex = roleOrder.indexOf(a.role.name);
    const bIndex = roleOrder.indexOf(b.role.name);

    if (aIndex > bIndex) {
      return 1;
    } else if (aIndex < bIndex) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getPlayersByRole(players: Player[], role: string) {
  return players.filter((player) => player.role.name === role);
}

export function getPlayersByFaction(players: Player[], faction: Faction) {
  return players.filter((player) => player.role.faction === faction);
}

export function getPlayersByAlignment(players: Player[], alignment: string) {
  return players.filter((player) => player.role.alignment === alignment);
}

export function getPlayersByActionType(players: Player[], actionType: string) {
  return players.filter((player) => player.role.action?.type === actionType);
}

export function setStatusForPlayers(players: Player[], statusKey: string, actionPlayers: Player[]) {
  players.forEach((player) => {
    const matchingPlayer = actionPlayers.find((actionPlayer) => actionPlayer.role.action?.targetId === player.id);
    if (matchingPlayer && player.status) {
      player.status = {
        ...player.status,
        [statusKey]: matchingPlayer,
      };
    }
  });
}