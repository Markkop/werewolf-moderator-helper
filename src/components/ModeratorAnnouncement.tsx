import { useGameContext } from "../contexts/GameContext";

export default function ModeratorAnnouncement() {
  const {
    night,
    setGameState,
    announcement,
    addItemToHistory,
    resetAnnouncement,
  } = useGameContext();

  const handleNextStep = () => {
    resetAnnouncement();
    addItemToHistory(`☀️ Day #${night}`);
    setGameState("trial");
  };

  return (
    <div>
      <h2>📢 Moderator Announcement</h2>
      <div>
        {announcement.map((text, index) => {
          return <div key={index}>{text}</div>;
        })}
      </div>
      <button onClick={handleNextStep}>Next step</button>
    </div>
  );
}
