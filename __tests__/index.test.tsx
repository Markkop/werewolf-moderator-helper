import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import IndexPage from "../src/pages/index";
import { GameProvider } from "../src/contexts/GameContext";

const setupGame = async (customRolesOrder?: string[]) => {
  render(
    <GameProvider customRolesOrder={customRolesOrder || []}>
      <IndexPage />
    </GameProvider>
  );

  fireEvent.click(screen.getByText("Next step"));
  fireEvent.click(screen.getByText("Next step"));
  fireEvent.click(screen.getByText("Next step"));
};

const performNightAction = (targetName: string) => {
  fireEvent.click(
    screen.getByText(targetName, { selector: "button", exact: false })
  );
};

test("Setups a default game", async () => {
  await setupGame();

  expect(
    screen.getByText(`Night 1 Actions - Player`, {
      exact: false,
    })
  ).toBeInTheDocument();
});

test("Mafia kills a player", async () => {
  await setupGame([
    "Mafioso", // Player 1
    "Townie", // Player 2
    "Sheriff", // Player 3
    "Doctor", // Player 4
    "Townie", // Player 5
  ]);

  // Mafia choose a target to kill
  performNightAction("Player 2"); // Mafioso kills Player 2

  // Doctor choose a target to heal
  performNightAction("Player 3"); // Doctor heals Player 3

  // Sheriff choose a target to investigate
  performNightAction("Player 4"); // Sheriff investigates Player 5

  expect(
    screen.getByText(`Player 2 (Townie) was killed by Player 1 (Mafioso)`, {
      exact: false,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByText("Nothing happened during the night", {
      exact: false,
    })
  ).not.toBeInTheDocument();
});

test("Mafia can't select other mafia", async () => {
  await setupGame([
    "Mafioso", // Player 1
    "Mafioso", // Player 2
    "Sheriff", // Player 3
    "Doctor", // Player 4
    "Townie", // Player 5
  ]);

  // Mafia choose a target to kill
  performNightAction("Player 2"); // Mafioso tries to target Player 2

  expect(
    screen.getByText(
      `Each night wake with the Mafia. You vote for a player to kill.`
    )
  ).toBeInTheDocument();
});

test("Mafia kills a player, but they are healed", async () => {
  await setupGame([
    "Mafioso", // Player 1
    "Townie", // Player 2
    "Sheriff", // Player 3
    "Doctor", // Player 4
    "Townie", // Player 5
  ]);

  performNightAction("Player 2"); // Mafioso kills Player 2
  performNightAction("Player 2"); // Doctor heals Player 2
  performNightAction("Player 4"); // Sheriff investigates Player 5

  expect(
    screen.getByText(
      `Player 2 (Townie) was attacked by Player 1 (Mafioso), but healed by Player 4 (Doctor)`,
      { exact: false }
    )
  ).toBeInTheDocument();
});

test("Mafia kills a player on first turn, but is healed on the second", async () => {
  await setupGame([
    "Mafioso", // Player 1
    "Townie", // Player 2
    "Sheriff", // Player 3
    "Doctor", // Player 4
    "Townie", // Player 5
  ]);

  performNightAction("Player 2"); // Mafioso kills Player 2
  performNightAction("Player 3"); // Doctor heals Player 3
  performNightAction("Player 4"); // Sheriff investigates Player 5
  fireEvent.click(screen.getByText("Next step"));
  fireEvent.click(screen.getByText("Skip Hanging"));
  fireEvent.click(screen.getByText("Next step"));
  performNightAction("Player 3"); // Mafioso kills Player 2
  performNightAction("Player 3"); // Doctor heals Player 3
  performNightAction("Player 1"); // Sheriff investigates Player 5

  expect(
    screen.getByText(`Player 2 (Townie) was killed by Plssayer 1 (Mafioso)`, {
      exact: false,
    })
  ).toBeInTheDocument();
});
