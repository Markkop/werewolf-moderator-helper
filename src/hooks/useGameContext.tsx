import { useContext } from "react";
import { GameContext } from "../contexts/game";

export const useGameContext = () => useContext(GameContext);
