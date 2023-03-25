import React from "react";
import { useGameContext } from "../contexts/GameContext";
import { useTimer } from "../hooks/useTimer";

export default function DiscussionAndVoting() {
  const { setGameState } = useGameContext();
  const { seconds, setSeconds } = useTimer(300);

  const handleNextStep = () => {
    setSeconds(0);
    setGameState("hangingStep");
  };

  return (
    <div>
      <div>Time left: {seconds} seconds</div>
      <button onClick={handleNextStep}>Next step</button>
    </div>
  );
}
