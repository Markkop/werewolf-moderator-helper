import React from "react";
import { useGameContext } from "../contexts/GameContext";

export default function ModeratorAnnouncement() {
  const { players, setGameState } = useGameContext();

  // Implement the logic to generate a summary of what happened that night
  // For example:
  // const summary = generateNightSummary(players);

  const handleNextStep = () => {
    setGameState("discussionAndVoting");
  };

  return (
    <div>
      <h2>Moderator Announcement</h2>
      {/* <div>{summary}</div> */}
      <button onClick={handleNextStep}>Next step</button>
    </div>
  );
}
