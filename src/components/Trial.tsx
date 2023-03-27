import React, { useState } from 'react'
import { useGameContext } from '../contexts/GameContext'
import { useTimer } from '../hooks/useTimer'
import { getPlayerTag } from '../utils/format'

export default function HangingStep() {
  const { players, updatePlayer, goToGameState, addItemToHistory } =
    useGameContext()
  const { seconds: defenseSeconds, setSeconds: setDefenseSeconds } = useTimer(0)
  const { seconds: discussionSeconds, setSeconds: setDiscussionSeconds } =
    useTimer(300)
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null)

  const handleSelectPlayer = (playerId: number) => {
    setSelectedPlayerId(playerId)
    setDefenseSeconds(30)
  }

  const handleHangPlayer = () => {
    if (selectedPlayerId) {
      const playerToHang = players.find(
        (player) => player.id === selectedPlayerId
      )
      if (playerToHang) {
        const playerTag = getPlayerTag(playerToHang)
        playerToHang.isDead = true
        addItemToHistory(`📢 ${playerTag} was hanged`)
        updatePlayer(playerToHang)
      }
    }

    setSelectedPlayerId(null)
    goToGameState('sleep')
  }

  function addSecondsToTimer(seconds: number) {
    setDiscussionSeconds(discussionSeconds + seconds)
  }

  const alivePlayers = players.filter((player) => !player.isDead)
  return (
    <div>
      <h2>Trial Step</h2>
      <h3>Discussion time</h3>
      <p>
        {' ⏳ '}
        {`${Math.floor(discussionSeconds / 60)}:${
          discussionSeconds % 60 < 10 ? '0' : ''
        }${discussionSeconds % 60}`}
      </p>
      <button onClick={() => addSecondsToTimer(60)}>Add 1 minute</button>
      <h3>Players</h3>
      <ul>
        {alivePlayers.map((player) => (
          <li key={player.id}>
            {selectedPlayerId === player.id && '👉 '}
            {player.name} {` (${player.role.name})`}
            <button onClick={() => handleSelectPlayer(player.id)}>
              Select
            </button>
            {selectedPlayerId === player.id &&
              Boolean(defenseSeconds) &&
              `Defense time: ⏳ ${defenseSeconds}s`}
          </li>
        ))}
      </ul>
      <button onClick={handleHangPlayer} disabled={!selectedPlayerId}>
        Hang selected player
      </button>
      <button
        onClick={() => {
          addItemToHistory('📢 No one was hanged')
          goToGameState('sleep')
        }}
      >
        Skip Hanging
      </button>
    </div>
  )
}
