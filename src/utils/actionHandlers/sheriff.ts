import { Player, RoleAction } from "../../interfaces";

export function handleSheriffAction(players: Player[], targetId: number): RoleAction {
  return { type: "investigate", targetId };
};
