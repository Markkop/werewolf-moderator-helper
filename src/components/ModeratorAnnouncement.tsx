import { useEffect } from "react";
import { useGameContext } from "../contexts/GameContext";
import { executeActions } from "../utils/executeActions";

export default function ModeratorAnnouncement() {
  const {
    night,
    setGameState,
    announcement,
    addItemToHistory,
    resetAnnouncement,
    addItemToAnnouncement,
    players,
    removeActionAndStatus,
  } = useGameContext();

  const handleNextStep = () => {
    removeActionAndStatus();
    resetAnnouncement();
    addItemToHistory(`☀️ Day #${night}`);
    setGameState("trial");
  };

  useEffect(() => {
    executeActions(players, addItemToHistory, addItemToAnnouncement);
  }, []);

  return (
    <div>
      <h2>📢 Moderator Announcement</h2>
      <div>
        {announcement?.length
          ? announcement.map((text, index) => {
              return <div key={index}>{text}</div>;
            })
          : "Nothing happened during the night."}
      </div>
      <button onClick={handleNextStep}>Next step</button>
    </div>
  );
}
