import React from "react";
import { useGameContext } from "../contexts/GameContext";
import { existingRoles } from "../data/existingRoles";
import { Role } from "../interfaces";

export default function SetupRoles() {
  const { roles, addRole, removeRole, setGameState } = useGameContext();

  const handleAddRole = (role: Role) => {
    addRole(role);
  };

  const handleRemoveRole = (role: Role) => {
    removeRole(role);
  };

  const handleNextStep = () => {
    setGameState("assignRoles");
  };

  return (
    <div>
      <h2>Setup Roles</h2>
      <ul>
        {roles.map((role, index) => (
          <li key={index}>
            {role.name}{" "}
            <button onClick={() => handleRemoveRole(role)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Add roles</h3>
        <ul>
          {existingRoles.map((role) => (
            <li key={role.name}>
              {role.name}{" "}
              <button onClick={() => handleAddRole(role)}>Add</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleNextStep}>Next step</button>
    </div>
  );
}
