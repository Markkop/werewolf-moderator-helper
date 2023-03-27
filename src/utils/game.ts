import { Faction, Player } from "../interfaces";
import { getAlivePlayers, getPlayersByFaction } from "./players";

export function isGameOver(players: Player[]): Faction | null {
  const alivePlayers = getAlivePlayers(players);
  const mafia = getPlayersByFaction(alivePlayers, "Mafia");
  const town = getPlayersByFaction(alivePlayers, "Town");

  if (mafia.length >= town.length) {
    return "Mafia";
  }

  if (mafia.length === 0) {
    return "Town";
  }

  return null;
}