import AssignRoles from "../components/AssignRoles";
import DiscussionAndVoting from "../components/DiscussionAndVoting";
import HangingStep from "../components/HangingStep";
import ModeratorAnnouncement from "../components/ModeratorAnnouncement";
import NightActions from "../components/NightActions";
import SetupPlayers from "../components/SetupPlayers";
import SetupRoles from "../components/SetupRoles";
import { useGameContext } from "../contexts/GameContext";

const Game: React.FC = () => {
  const { gameState, gameHistory } = useGameContext();

  const renderGameState = () => {
    switch (gameState) {
      case "setupPlayers":
        return <SetupPlayers />;
      case "setupRoles":
        return <SetupRoles />;
      case "assignRoles":
        return <AssignRoles />;
      case "nightActions":
        return <NightActions />;
      case "moderatorAnnouncement":
        return <ModeratorAnnouncement />;
      case "discussionAndVoting":
        return <DiscussionAndVoting />;
      case "hangingStep":
        return <HangingStep />;
      default:
        return <SetupPlayers />;
    }
  };
  console.log(gameHistory);
  return (
    <div>
      <div>{renderGameState()}</div>
      <div>
        <h2>Game History</h2>
        <ul>
          {gameHistory.flat().map((historyItem, index) => (
            <li key={index}>{historyItem}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Game;
