import { createContext, useContext, useEffect, useState } from 'react'
import { Player, Role } from '../interfaces'
import { executeActions } from '../utils/executeActions'
import { isGameOver } from '../utils/game'
import { getRoleByName } from '../utils/roles'

interface GameContextState {
  players: Player[]
  addPlayer: (name: string) => void
  removePlayer: (playerId: number) => void
  updatePlayersByMapFn: (mapFn: (player: Player) => Player) => void
  updatePlayer: (player: Player) => void
  removeActionAndStatus: () => void
  roles: Role[]
  addRole: (role: Role) => void
  removeRoleByIndex: (index: number) => void
  updateRole: (role: Role) => void
  gameState: string
  setGameState: (state: string) => void
  gameHistory: string[]
  addItemToHistory: (item: string) => void
  customRolesOrder: string[]
  announcement: string[]
  addItemToAnnouncement: (item: string) => void
  resetAnnouncement: () => void
  night: number
  goToNextNight: () => void
  goToGameState: (state: string) => void
  checkGameOver: (players: Player[]) => void
  clearHistory: () => void
  resetGame: () => void
}

const GameContext = createContext<GameContextState | undefined>(undefined)

export const useGameContext = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider')
  }
  return context
}

interface Props {
  children: React.ReactNode
  customRolesOrder?: string[]
}

export const GameProvider: React.FC<Props> = ({
  children,
  customRolesOrder,
}) => {
  const defaultPlayers: Player[] = Array.from(
    { length: customRolesOrder?.length || 5 },
    (_, i) => ({
      id: i,
      name: `Player ${i + 1}`,
      isDead: false,
    })
  )

  const [players, setPlayers] = useState<Player[]>(defaultPlayers)
  const defaultRoles = customRolesOrder?.length
    ? customRolesOrder.map((roleName) => {
        const role = getRoleByName(roleName)
        if (!role) throw new Error(`Role ${roleName} not found`)
        return role
      })
    : [
        getRoleByName('Townie'),
        getRoleByName('Townie'),
        getRoleByName('Mafioso'),
        getRoleByName('Doctor'),
        getRoleByName('Sheriff'),
      ]

  const [roles, setRoles] = useState<Role[]>(defaultRoles)
  const [gameState, setGameState] = useState('idle')
  const [gameHistory, setGameHistory] = useState([])
  const [night, setNight] = useState(0)
  const [announcement, setAnnouncement] = useState([])

  useEffect(() => {
    if (gameState === 'moderatorAnnouncement') {
      const playersAfterNight = executeActions(
        players,
        addItemToHistory,
        addItemToAnnouncement
      )
      setPlayers(playersAfterNight)
    }
  }, [gameState])

  const checkGameOver = (playersParam: Player[]) => {
    const winnerFaction = isGameOver(playersParam || players)
    if (winnerFaction) {
      addItemToHistory(`🏁 Game over! ${winnerFaction} won!`)
      return true
    }
    return false
  }

  const resetGame = () => {
    setPlayers(defaultPlayers)
    setGameHistory([])
    setNight(0)
    setAnnouncement([])
    setGameState('setupRoles')
  }

  const goToGameState = (state: string) => {
    if (night > 0 && checkGameOver(players)) {
      setGameState('gameOver')
      return
    }
    setGameState(state)
  }

  const addPlayer = (name: string) => {
    const newPlayer: Player = {
      id: Date.now(),
      name,
      isDead: false,
    }
    setPlayers([...players, newPlayer])
  }

  const removePlayer = (playerId: number) => {
    setPlayers(players.filter((player) => player.id !== playerId))
  }

  const updatePlayer = (updatedPlayer: Player) => {
    setPlayers(
      players.map((player) =>
        player.id === updatedPlayer.id ? updatedPlayer : player
      )
    )
  }

  const updatePlayersByMapFn = (mapFn: (player: Player) => Player) => {
    setPlayers(players.map(mapFn))
  }

  const addRole = (role: Role) => {
    setRoles([...roles, role])
  }

  const removeRoleByIndex = (index: number) => {
    setRoles(roles.filter((_, i) => i !== index))
  }

  const updateRole = (updatedRole: Role) => {
    setRoles(
      roles.map((role) => (role.name === updatedRole.name ? updatedRole : role))
    )
  }

  const removeActionAndStatus = () => {
    setPlayers(
      players.map((player) => ({
        ...player,
        turn: undefined,
      }))
    )
  }

  const addItemToHistory = (item: string) => {
    setGameHistory((prevItems) => [...prevItems, item])
  }

  const clearHistory = () => {
    setGameHistory([])
  }

  const goToNextNight = () => {
    setNight((prevNight) => prevNight + 1)
  }

  const addItemToAnnouncement = (item: string) => {
    setAnnouncement((prevItems) => [...prevItems, item])
  }

  const resetAnnouncement = () => {
    setAnnouncement([])
  }

  return (
    <GameContext.Provider
      value={{
        players,
        addPlayer,
        removePlayer,
        updatePlayer,
        updatePlayersByMapFn,
        removeActionAndStatus,
        roles,
        addRole,
        removeRoleByIndex,
        updateRole,
        gameState,
        setGameState,
        gameHistory,
        addItemToHistory,
        customRolesOrder,
        announcement,
        addItemToAnnouncement,
        resetAnnouncement,
        night,
        goToNextNight,
        goToGameState,
        checkGameOver,
        clearHistory,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
