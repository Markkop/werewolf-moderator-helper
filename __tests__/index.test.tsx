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

test("Mafia kills a player in the first night", async () => {
  await setupGame(["Mafioso", "Townie", "Sheriff", "Doctor", "Townie"]);

  // Assume the following role assignments for simplicity:
  // Player 1: Mafioso
  // Player 2: Townie
  // Player 3: Sheriff
  // Player 4: Doctor
  // Player 5: Townie

  // Night actions
  performNightAction("Player 2"); // Mafioso kills Player 2
  performNightAction("Player 3"); // Doctor heals Player 3
  performNightAction("Player 4"); // Sheriff investigates Player 5

  fireEvent.click(screen.getByText("Finish Night Actions"));

  await waitFor(() => {
    expect(screen.getByText("Moderator Announcement")).toBeInTheDocument();
  });

  expect(
    screen.getByText(`Player 2 was killed by Player 1 (Mafioso)`)
  ).toBeInTheDocument();
  // expect(
  //   screen.getByText("Sheriff investigated Player 4 and found them to be Evil.")
  // ).toBeInTheDocument();
});
