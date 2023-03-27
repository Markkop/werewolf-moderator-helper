import { useGameContext } from '../contexts/GameContext'

export default function GameOver() {
  const { goToGameState, gameHistory } = useGameContext()

  const handleNextStep = () => {
    goToGameState('setupPlayers')
  }

  return (
    <div>
      <h2>Game Over</h2>
      <div>{gameHistory[gameHistory.length - 1]}</div>
      <button onClick={handleNextStep}>Start again</button>
    </div>
  )
}
