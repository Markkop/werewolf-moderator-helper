import React, { useEffect } from "react";
import { useGameContext } from "../contexts/GameContext";

export default function AssignRoles() {
  const { players, roles, updatePlayer, setGameState } = useGameContext();

  const shuffle = (array: any[]) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  useEffect(() => {
    const shuffledRoles = shuffle([...roles]);
    const updatedPlayers = players.map((player, index) => {
      player.role = shuffledRoles[index];
      return player;
    });
    updatedPlayers.forEach(updatePlayer);
  }, [players, roles, updatePlayer]);

  const handleNextStep = () => {
    setGameState("nightActions");
  };

  return (
    <div>
      <h2>Roles Assigned</h2>
      <button onClick={handleNextStep}>Next step</button>
    </div>
  );
}
