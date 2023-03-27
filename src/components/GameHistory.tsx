import { useGameContext } from '../contexts/GameContext'

export default function GameHistory({}) {
  const { gameHistory, clearHistory } = useGameContext()

  return (
    <div>
      <h2>Game History</h2>
      <button onClick={clearHistory}>Clear history</button>
      <ul>
        {gameHistory.map((historyItem, index) => (
          <li key={index}>{historyItem}</li>
        ))}
      </ul>
    </div>
  )
}
