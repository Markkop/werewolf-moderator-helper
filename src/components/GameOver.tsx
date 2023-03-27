import { useGameContext } from '../contexts/GameContext'

export default function GameOver() {
  const { gameHistory, resetGame } = useGameContext()

  const handleNextStep = () => {
    resetGame()
  }

  return (
    <div>
      <h2>Game Over</h2>
      <div>{gameHistory[gameHistory.length - 1]}</div>
      <button onClick={handleNextStep}>Start again</button>
    </div>
  )
}
