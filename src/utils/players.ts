import { roleOrder } from '../data/existingRoles'
import { Action, ActionInitiator, Faction, Player } from '../interfaces'

export function filterAlivePlayers(players: Player[]) {
  return players.filter((player) => !player.isDead)
}

export function filterPlayersWithNightAction(players: Player[]) {
  return players.filter((player) => player.role.hasNightAction)
}

export function selectAndFilterMafiosos(players: Player[]) {
  const mafiosos = players.filter((player) => {
    return player.role.name === 'Mafioso'
  })

  if (mafiosos.length > 1) {
    const randomMafiosoIndex = Math.floor(Math.random() * mafiosos.length)
    const randomMafioso = mafiosos[randomMafiosoIndex]
    players.splice(players.indexOf(randomMafioso), 1)
  }

  return players
}

export function orderPlayersByRole(players: Player[]) {
  return players.sort((a, b) => {
    const aIndex = roleOrder.indexOf(a.role.name)
    const bIndex = roleOrder.indexOf(b.role.name)

    if (aIndex > bIndex) {
      return 1
    } else if (aIndex < bIndex) {
      return -1
    }
    return 0
  })
}

export function getPlayersByRole(players: Player[], role: string) {
  return players.filter((player) => player.role.name === role)
}

export function getPlayersByFaction(players: Player[], faction: Faction) {
  return players.filter((player) => player.role.faction === faction)
}

export function getPlayersByAlignment(players: Player[], alignment: string) {
  return players.filter((player) => player.role.alignment === alignment)
}

export function getPlayersByActionType(
  players: Player[],
  actionInitiator: ActionInitiator[],
  actionType: string
) {
  const initiators = actionInitiator.filter(
    (action) => action.action === actionType
  )
  return players.filter((player) =>
    initiators.some((initiator) => initiator.initiatorId === player.id)
  )
}

export function updatePlayersFromAction(
  players: Player[],
  currentPlayer: Player,
  updatePlayersByMapFn: (mapFn: (player: Player) => Player) => void,
  targetId: number,
  action: Action
) {
  const updatedPlayer = {
    ...currentPlayer,
    turn: {
      ...currentPlayer.turn,
      target: { action, targetId },
    },
  }

  const targettedPlayer = players.find((player) => player.id === targetId)
  const updatedTargettedPlayer = {
    ...targettedPlayer,
    turn: {
      ...targettedPlayer?.turn,
      targettedBy: [
        ...(targettedPlayer?.turn?.targettedBy || []),
        { action, initiatorId: currentPlayer.id },
      ],
    },
  }

  updatePlayersByMapFn((player) => {
    if (player.id === currentPlayer.id) {
      return updatedPlayer
    } else if (player.id === targetId) {
      return updatedTargettedPlayer
    }
    return player
  })
}
