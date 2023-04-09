export type PlayerTurn = {
  target?: ActionTarget
  targettedBy?: ActionInitiator[]
}
export interface Player {
  id: number
  name: string
  isDead: boolean
  role?: Role
  turn?: PlayerTurn
}

export type Action = 'heal' | 'investigate' | 'kill'

export type ActionTarget = {
  action: Action
  targetId: number
}

export type ActionInitiator = {
  action: Action
  initiatorId: number
}

export interface Role {
  name: string
  description: string
  alignment: string
  virtueValue: string
  faction: Faction
  nightAction?: {
    action: Action
    handler: (
      players: Player[],
      targetId: number,
      currentPlayer: Player,
      updatePlayersByMapFn: (mapFn: (player: Player) => Player) => void
    ) => void
  }
}

export type Alignment = 'Good' | 'Evil'
export type Faction = 'Mafia' | 'Town' | 'Neutral'
