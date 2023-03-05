import { existingRoles } from "../../data/roles";
import { useGameContext } from "../../hooks/useGameContext";
import { Checkbox } from "../checkbox";

export function RoleSelection() {
  const { addRole, removeRole } = useGameContext();
  return (
    <div className="">
      Select the roles to be in the game
      <div className="flex flex-col">
        {existingRoles.map((role) => {
          return (
            <Checkbox
              key={role.name}
              label={role.name}
              onChecked={() => addRole(role)}
              onUnchecked={() => removeRole(role)}
            />
          );
        })}
      </div>
    </div>
  );
}
