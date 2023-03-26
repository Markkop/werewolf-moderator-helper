import React, { useEffect } from "react";
import { useGameContext } from "../contexts/GameContext";

export default function AssignRoles() {
  const {
    players,
    roles,
    updatePlayer,
    setGameState,
    customRolesOrder,
    addItemToHistory,
  } = useGameContext();

  const shuffle = (array: any[], customRolesOrder: string[]) => {
    let currentIndex = array.length;
    let temporaryValue;
    let arrayIndex;
    while (currentIndex !== 0) {
      if (customRolesOrder?.length > 0) {
        const customRole = customRolesOrder.pop();
        arrayIndex = array.findIndex((role) => role.name === customRole);
      } else {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        arrayIndex = randomIndex;
      }

      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[arrayIndex];
      array[arrayIndex] = temporaryValue;
    }

    return array;
  };

  useEffect(() => {
    const shuffledRoles = shuffle([...roles], customRolesOrder);

    for (let i = 0; i < players.length; i++) {
      players[i].role = shuffledRoles[i];
      updatePlayer(players[i]);
      addItemToHistory(`${players[i].name} is ${players[i].role.name}`);
    }
  }, []);

  const handleNextStep = () => {
    addItemToHistory("Night 1");
    setGameState("nightActions");
  };

  return (
    <div>
      <h2>Roles Assigned</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name} - {player.role?.name}
          </li>
        ))}
      </ul>
      <button onClick={handleNextStep}>Next step</button>
    </div>
  );
}
