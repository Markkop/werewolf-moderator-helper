import React from "react";
import { useGameContext } from "../contexts/GameContext";
import { Player } from "../interfaces";

export default function ModeratorAnnouncement() {
  const { players, setGameState } = useGameContext();

  // Implement the logic to generate a summary of what happened that night
  // For example:
  const summary = generateNightSummary(players);

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

const generateNightSummary = (players: Player[]) => {
  const actions = players.map((player) => player.role.action);
  const killed = actions.find((action) => action?.type === "kill")?.targetId;
  const healed = actions.find((action) => action?.type === "heal")?.targetId;

  let summary = "";

  if (killed && killed !== healed) {
    const killedPlayer = players.find((player) => player.id === killed);
    if (killedPlayer) {
      killedPlayer.isDead = true;
      summary += `Player ${killedPlayer.name} died.\n`;
    }
  } else {
    summary += "No one died.\n";
  }

  const investigations = actions.filter(
    (action) => action?.type === "investigate"
  );

  for (const investigation of investigations) {
    if (investigation?.targetId) {
      const targetPlayer = players.find(
        (player) => player.id === investigation.targetId
      );
      if (targetPlayer) {
        summary += `Sheriff investigated ${targetPlayer.name} and found them to be ${targetPlayer.role.alignment}.\n`;
      }
    }
  }

  return summary;
};
