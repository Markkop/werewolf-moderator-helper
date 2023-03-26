import React from "react";
import { useGameContext } from "../contexts/GameContext";

export default function ModeratorAnnouncement() {
  const { setGameState, currentNightSummary } = useGameContext();

  // Implement the logic to generate a summary of what happened that night
  // For example:
  const summary = currentNightSummary.map((text, index) => {
    return <div key={index}>{text}</div>;
  });

  const handleNextStep = () => {
    setGameState("discussionAndVoting");
  };

  return (
    <div>
      <h2>Moderator Announcement</h2>
      <div>{summary}</div>
      <button onClick={handleNextStep}>Next step</button>
    </div>
  );
}
