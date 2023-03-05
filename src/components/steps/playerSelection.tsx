import { existingPlayerNames } from "../../data/players";
import { useGameContext } from "../../hooks/useGameContext";
import { Checkbox } from "../checkbox";

export default function PlayerSelection() {
  const { addPlayer, removePlayer, goToStep } = useGameContext();
  return (
    <div className="">
      Create and select the players to be in the game
      <div className="flex flex-col">
        {existingPlayerNames.map((playerName) => (
          <Checkbox
            label={playerName}
            onChecked={() => addPlayer(playerName)}
            onUnchecked={() => removePlayer(playerName)}
          />
        ))}
      </div>
      <button type="button" onClick={() => goToStep("roles")}>
        Next
      </button>
    </div>
  );
}
