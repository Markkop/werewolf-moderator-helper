import Trial from '../components/Trial'
import ModeratorAnnouncement from '../components/ModeratorAnnouncement'
import NightActions from '../components/NightActions'
import SetupPlayers from '../components/SetupPlayers'
import SetupRoles from '../components/SetupRoles'
import Sleep from '../components/Sleep'
import { useGameContext } from '../contexts/GameContext'

const Game: React.FC = () => {
  const { gameState, gameHistory } = useGameContext()

  const gameStateMapping = {
    setupPlayers: <SetupPlayers />,
    setupRoles: <SetupRoles />,
    night: <NightActions />,
    moderatorAnnouncement: <ModeratorAnnouncement />,
    trial: <Trial />,
    sleep: <Sleep />,
  }

  const renderGameState = () => {
    return gameStateMapping[gameState] || <SetupPlayers />
  }

  return (
    <div>
      <div>{renderGameState()}</div>
      {gameHistory.length > 0 && (
        <div>
          <h2>Game History</h2>
          <ul>
            {gameHistory.map((historyItem, index) => (
              <li key={index}>{historyItem}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Game
