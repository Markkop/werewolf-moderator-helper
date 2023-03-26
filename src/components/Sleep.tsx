import { useEffect } from "react";
import { useGameContext } from "../contexts/GameContext";
import { useTimer } from "../hooks/useTimer";

export default function SleepStep() {
  const { night, gameHistory, setGameState, addItemToHistory, goToNextNight } =
    useGameContext();
  const { seconds } = useTimer(10);
  const nextNight = night + 1;

  const handleNextStep = () => {
    addItemToHistory(`🌑 Night #${nextNight}`);
    setGameState("night");
    goToNextNight();
  };

  useEffect(() => {
    if (seconds === 0) {
      handleNextStep();
    }
  }, [seconds]);

  const lastHistory = gameHistory[gameHistory.length - 1];
  return (
    <div>
      <h2>Sleep Step</h2>
      <h3>Time until {nextNight}</h3>
      <p>
        {" ⏳ "}
        {`${seconds}s`}
      </p>
      <p>{lastHistory}</p>
      <button onClick={handleNextStep}>Next step</button>
    </div>
  );
}
