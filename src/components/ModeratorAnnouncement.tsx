import { useEffect } from "react";
import { useGameContext } from "../contexts/GameContext";

export default function ModeratorAnnouncement() {
  const {
    night,
    setGameState,
    announcement,
    addItemToHistory,
    resetAnnouncement,
    addItemToAnnouncement,
  } = useGameContext();

  const handleNextStep = () => {
    resetAnnouncement();
    addItemToHistory(`☀️ Day #${night}`);
    setGameState("trial");
  };

  useEffect(() => {
    if (announcement.length === 0) {
      addItemToAnnouncement("Nothing happened during the night.");
    }

    announcement.forEach((item) => {
      addItemToHistory(`📢 ${item}`);
    });
  }, []);

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
