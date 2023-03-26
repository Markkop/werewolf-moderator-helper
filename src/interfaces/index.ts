
export interface Player {
  id: number;
  name: string;
  isDead: boolean;
  role?: Role;
  status?: {
    killer?: Player;
    healer?: Player;
  };
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
  faction: Faction,
  hasNightAction: boolean
}

export type Alignment = 'Good' | 'Evil'
export type Faction = 'Mafia' | 'Town'
