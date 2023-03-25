export type GameContextType = {
  players: Player[]
  addPlayer: (playerName: string) => void
  removePlayer: (playerName: string) => void
  step: Step
  goToStep: (step: Step) => void
  roles: Role[]
  addRole: (role: Role) => void
  removeRole: (role: Role) => void
}

export interface Player {
  id: number;
  name: string;
  role: Role;
  isDead: boolean;
}

export interface Role {
  name: string;
  description: string;
  alignment: string;
  points: string;
}

export type Alignment = 'Good' | 'Evil'

export type Step = 'players' | 'roles' | 'night' | 'day' | 'end'