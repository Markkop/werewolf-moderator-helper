import PlayerSelection from "../components/steps/playerSelection";
import { RoleSelection } from "../components/steps/roleSelection";
import { useGameContext } from "../hooks/useGameContext";

const steps = {
  players: <PlayerSelection />,
  roles: <RoleSelection />,
};

export default function Home() {
  const { step } = useGameContext();

  if (step in steps) {
    return steps[step];
  }

  return <div>Something went wrong</div>;
}
