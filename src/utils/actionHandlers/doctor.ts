import { Player, RoleAction } from "../../interfaces";

export function handleDoctorAction(players: Player[], targetId: number): RoleAction {
  return { type: "heal", targetId };
};