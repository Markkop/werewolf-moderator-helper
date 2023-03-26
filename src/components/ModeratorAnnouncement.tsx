import React, { useEffect } from "react";
import { useGameContext } from "../contexts/GameContext";
import { finishNightActionsHandler } from "../utils/finishNightActionsHandler";

export default function ModeratorAnnouncement() {
  const {
    setGameState,
    announcement,
    addItemToHistory,
    addItemToAnnouncement,
    players,
    updatePlayer,
  } = useGameContext();

  useEffect(() => {
    handleFinishNightActions();
  }, []);

  const handleFinishNightActions = () => {
    const afterNightPlayers = finishNightActionsHandler(
      players,
      addItemToHistory,
      addItemToAnnouncement
    );

    afterNightPlayers.forEach((player) => {
      if (player.role.action) delete player.role.action;
      if (player?.status) delete player?.status;
      updatePlayer(player);
    });
  };

  const handleNextStep = () => {
    setGameState("trial");
  };

  return (
    <div>
      <h2>Moderator Announcement</h2>
      <div>
        {announcement.map((text, index) => {
          return <div key={index}>{text}</div>;
        })}
      </div>
      <button onClick={handleNextStep}>Next step</button>
    </div>
  );
}
