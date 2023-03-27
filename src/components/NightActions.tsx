import React, { useState } from 'react'
import { useGameContext } from '../contexts/GameContext'
import { Player } from '../interfaces'
import { handleDoctorAction } from '../utils/actionHandlers/doctor'
import { handleMafiosoAction } from '../utils/actionHandlers/mafioso'
import { handleSheriffAction } from '../utils/actionHandlers/sheriff'
import {
  filterAlivePlayers,
  filterPlayersWithNightAction,
  orderPlayersByRole,
  selectAndFilterMafiosos,
} from '../utils/players'
import SkipButton from './SkipButton'

export default function NightActions() {
  const {
    players,
    updatePlayersByMapFn,
    goToGameState,
    addItemToHistory,
    night,
  } = useGameContext()
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)

  const alivePlayers = filterAlivePlayers(players)
  const playersWithNightActions = filterPlayersWithNightAction(alivePlayers)
  const actingPlayers = selectAndFilterMafiosos(playersWithNightActions)
  const orderedPlayers = orderPlayersByRole(actingPlayers)

  const currentPlayer = orderedPlayers[currentPlayerIndex]

  if (!currentPlayer) return null
  const isLastPlayer = currentPlayerIndex === orderedPlayers.length - 1

  const handleNextPlayer = () => {
    if (isLastPlayer) {
      goToGameState('moderatorAnnouncement')
    }
    setCurrentPlayerIndex(currentPlayerIndex + 1)
  }

  const handleAction = (targetId: number) => {
    const mapRoleToActionHandler: Record<
      string,
      (
        players: Player[],
        targetId: number,
        currentPlayer: Player,
        updatePlayersByMapFn: (mapFn: (player: Player) => Player) => void
      ) => void
    > = {
      Mafioso: handleMafiosoAction,
      Doctor: handleDoctorAction,
      Sheriff: handleSheriffAction,
    }

    const actionHandler = mapRoleToActionHandler[currentPlayer.role.name]
    if (!actionHandler) return

    actionHandler(players, targetId, currentPlayer, updatePlayersByMapFn)

    addItemToHistory(
      `▫️ ${currentPlayer.name} (${currentPlayer.role.name}) targeted ${
        players.find((player) => player.id === targetId)?.name
      }`
    )

    handleNextPlayer()
  }

  const isDisabled = (player: Player) => {
    if (currentPlayer.role.name === 'Mafioso') {
      return player.role.faction === 'Mafia'
    }

    if (currentPlayer.role.name === 'Sheriff') {
      return player.id === currentPlayer.id
    }

    return false
  }

  const alignmentIcon = (player: Player) => {
    if (currentPlayer.role.name !== 'Sheriff') return
    return player.role.alignment === 'Good' ? '👍' : '👎'
  }

  return (
    <div>
      <h2>
        {`Night ${night} Actions - ${currentPlayer.name} (${currentPlayer.role.name})`}
      </h2>
      <p>{currentPlayer.role.description}</p>
      <ul>
        {alivePlayers.map((player) => (
          <li key={player.id}>
            <button
              onClick={() => handleAction(player.id)}
              disabled={isDisabled(player)}
            >
              {alignmentIcon(player)} {`${player.name} (${player.role.name})`}
            </button>
          </li>
        ))}
      </ul>
      <SkipButton onClick={handleNextPlayer} role={currentPlayer.role.name} />
    </div>
  )
}
