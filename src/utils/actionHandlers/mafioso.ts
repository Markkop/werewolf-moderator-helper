import { Player, RoleAction } from "../../interfaces";
import { filterAlivePlayers, getPlayersByFaction } from "../players";

export function handleMafiosoAction(players: Player[], targetId: number): RoleAction {
  const alivePlayers = filterAlivePlayers(players);
  const mafiaMembers = getPlayersByFaction(alivePlayers, "Mafia");

  if (mafiaMembers.find((mafiaMember) => mafiaMember.id === targetId)) {
    return;
  }

  return { type: "kill", targetId }
};