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

export type Player = {
  name: string
  role?: Role
  isAlive: boolean
}

export type Role = {
  name: string
  description: string
  alignment: Alignment
  points: string
}

export type Alignment = 'Good' | 'Evil'

export type Step = 'players' | 'roles' | 'night' | 'day' | 'end'