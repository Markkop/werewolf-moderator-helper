import Trial from '../components/Trial'
import ModeratorAnnouncement from '../components/ModeratorAnnouncement'
import NightActions from '../components/NightActions'
import SetupPlayers from '../components/SetupPlayers'
import SetupRoles from '../components/SetupRoles'
import Sleep from '../components/Sleep'
import GameOver from '../components/GameOver'
import { useGameContext } from '../contexts/GameContext'
import GameHistory from '../components/GameHistory'

const Game: React.FC = () => {
  const { gameState, gameHistory } = useGameContext()

  const gameStateMapping = {
    setupPlayers: <SetupPlayers />,
    setupRoles: <SetupRoles />,
    night: <NightActions />,
    moderatorAnnouncement: <ModeratorAnnouncement />,
    trial: <Trial />,
    sleep: <Sleep />,
    gameOver: <GameOver />,
  }

  const renderGameState = () => {
    return gameStateMapping[gameState] || <SetupPlayers />
  }

  return (
    <div>
      <div>{renderGameState()}</div>
      {gameHistory.length > 0 && <GameHistory />}
    </div>
  )
}

export default Game
