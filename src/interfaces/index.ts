
export interface Player {
  id: number;
  name: string;
  role: Role;
  isDead: boolean;
}

export type RoleActionType = 'heal' | 'investigate' | 'kill';

export type RoleAction = {
  type: RoleActionType
  targetId: number;
};

export interface Role {
  name: string;
  description: string;
  alignment: string;
  points: string;
  action?: RoleAction;
}

export type Alignment = 'Good' | 'Evil'

export type Step = 'players' | 'roles' | 'night' | 'day' | 'end'