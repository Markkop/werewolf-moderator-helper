import { FunctionComponent, createContext, useState } from "react";
import { GameContextType, Role, Step } from "../interfaces";

interface GameProviderProps {
  children: React.ReactNode;
}

export const GameContext = createContext<GameContextType>(null);

export const GameProvider: FunctionComponent<GameProviderProps> = ({
  children,
}) => {
  const [players, setPlayers] = useState([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [step, setStep] = useState<Step>("players");

  function addPlayer(playerName: string) {
    setPlayers((players) => [
      ...players,
      {
        name: playerName,
        isAlive: true,
      },
    ]);
  }

  function removePlayer(playerName: string) {
    setPlayers((players) => players.filter((p) => p.name !== playerName));
  }

  function addRole(role: Role) {
    setRoles((roles) => [...roles, role]);
  }

  function removeRole(role: Role) {
    setRoles((roles) => roles.filter((r) => r.name !== role.name));
  }

  function goToStep(step: Step) {
    setStep(step);
  }
  return (
    <GameContext.Provider
      value={{
        players,
        addPlayer,
        removePlayer,
        step,
        goToStep,
        roles,
        addRole,
        removeRole,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
