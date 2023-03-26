// src/GameContext.ts
import { createContext, useContext, useState } from "react";
import { existingRoles } from "../data/existingRoles";
import { Player, Role } from "../interfaces";

interface GameContextState {
  players: Player[];
  addPlayer: (name: string) => void;
  removePlayer: (playerId: number) => void;
  updatePlayer: (player: Player) => void;
  roles: Role[];
  addRole: (role: Role) => void;
  removeRole: (role: Role) => void;
  updateRole: (role: Role) => void;
  gameState: string;
  setGameState: (state: string) => void;
  nightSummaries: string[];
  addNightSummary: (summary: string) => void;
  currentNightSummary: string[];
  addItemToCurrentNightSummary: (item: string) => void;
  customRolesOrder: string[];
}

const GameContext = createContext<GameContextState | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

interface Props {
  children: React.ReactNode;
  customRolesOrder?: string[];
}

export const GameProvider: React.FC<Props> = ({
  children,
  customRolesOrder,
}) => {
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      name: "Player 1",
      role: { name: "", description: "", alignment: "", points: "" },
      isDead: false,
    },
    {
      id: 2,
      name: "Player 2",
      role: { name: "", description: "", alignment: "", points: "" },
      isDead: false,
    },
    {
      id: 3,
      name: "Player 3",
      role: { name: "", description: "", alignment: "", points: "" },
      isDead: false,
    },
    {
      id: 4,
      name: "Player 4",
      role: { name: "", description: "", alignment: "", points: "" },
      isDead: false,
    },
    {
      id: 5,
      name: "Player 5",
      role: { name: "", description: "", alignment: "", points: "" },
      isDead: false,
    },
  ]);
  const [roles, setRoles] = useState<Role[]>([
    existingRoles[0],
    ...existingRoles,
  ]);
  const [gameState, setGameState] = useState("idle");
  const [nightSummaries, setnightSummaries] = useState([]);
  const [currentNightSummary, setCurrentNightSummary] = useState<string[]>([]);

  const addPlayer = (name: string) => {
    const newPlayer: Player = {
      id: Date.now(),
      name,
      role: { name: "", description: "", alignment: "", points: "" },
      isDead: false,
    };
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = (playerId: number) => {
    setPlayers(players.filter((player) => player.id !== playerId));
  };

  const updatePlayer = (updatedPlayer: Player) => {
    setPlayers(
      players.map((player) =>
        player.id === updatedPlayer.id ? updatedPlayer : player
      )
    );
  };

  const addRole = (role: Role) => {
    setRoles([...roles, role]);
  };

  const removeRole = (roleToRemove: Role) => {
    setRoles(roles.filter((role) => role.name !== roleToRemove.name));
  };

  const updateRole = (updatedRole: Role) => {
    setRoles(
      roles.map((role) => (role.name === updatedRole.name ? updatedRole : role))
    );
  };

  const addNightSummary = (summary: string) => {
    setnightSummaries((prevSummaries) => [...prevSummaries, summary]);
  };

  const addItemToCurrentNightSummary = (item: string) => {
    setCurrentNightSummary((prevItems) => [...prevItems, item]);
  };

  return (
    <GameContext.Provider
      value={{
        players,
        addPlayer,
        removePlayer,
        updatePlayer,
        roles,
        addRole,
        removeRole,
        updateRole,
        gameState,
        setGameState,
        nightSummaries,
        addNightSummary,
        currentNightSummary,
        addItemToCurrentNightSummary,
        customRolesOrder,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
