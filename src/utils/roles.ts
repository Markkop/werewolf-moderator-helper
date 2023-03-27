import { Player, Role } from '../interfaces'

export function shufflePlayers(array: Role[], customRolesOrder: string[] = []) {
  let currentIndex = array.length
  let temporaryValue
  let arrayIndex
  while (currentIndex !== 0) {
    if (customRolesOrder?.length > 0) {
      const customRole = customRolesOrder.pop()
      arrayIndex = array.findIndex((role) => role.name === customRole)
    } else {
      const randomIndex = Math.floor(Math.random() * currentIndex)
      arrayIndex = randomIndex
    }

    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[arrayIndex]
    array[arrayIndex] = temporaryValue
  }

  return array
}

export function assignRolesToPlayers(
  players: Player[],
  roles: Role[],
  customRolesOrder: string[],
  updatePlayer: (player: Player) => void,
  addItemToHistory: (item: string) => void
) {
  const shuffledRoles = shufflePlayers([...roles], customRolesOrder)

  for (let i = 0; i < players.length; i++) {
    players[i].role = shuffledRoles[i]
    updatePlayer(players[i])
    addItemToHistory(`▫️ ${players[i].name} is ${players[i].role.name}`)
  }
}
