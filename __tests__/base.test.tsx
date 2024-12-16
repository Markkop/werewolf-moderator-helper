import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import IndexPage from '../src/pages/index'
import { GameProvider } from '../src/contexts/GameContext'

const setupGame = async (customRolesOrder?: string[]) => {
  render(
    <GameProvider customRolesOrder={customRolesOrder || []}>
      <IndexPage />
    </GameProvider>
  )

  fireEvent.click(screen.getByText('Next step'))
  fireEvent.click(screen.getByText('Next step'))
  fireEvent.click(screen.getByText('Next step'))
}

const clickOnButton = (targetName: string) => {
  fireEvent.click(
    screen.getByText(targetName, { selector: 'button', exact: false })
  )
}

test('Setups a default game', async () => {
  await setupGame()

  expect(
    screen.getByText(`Night 1 Actions - Player`, {
      exact: false,
    })
  ).toBeInTheDocument()
})

test("Can't setup a game with mismatching players and roles number", async () => {
  render(
    <GameProvider customRolesOrder={[]}>
      <IndexPage />
    </GameProvider>
  )

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'Player 6' },
  })

  fireEvent.click(screen.getByText('Add player'))
  fireEvent.click(screen.getByText('Next step'))

  expect(
    screen.getByText(`You need`, {
      exact: false,
    })
  ).toBeInTheDocument()
})

test('Mafia kills a player', async () => {
  await setupGame([
    'Mafioso', // Player 1
    'Townie', // Player 2
    'Sheriff', // Player 3
    'Doctor', // Player 4
    'Townie', // Player 5
  ])

  // Mafia choose a target to kill
  clickOnButton('Player 2') // Mafioso kills Player 2

  // Doctor choose a target to heal
  clickOnButton('Player 3') // Doctor heals Player 3

  // Sheriff choose a target to investigate
  clickOnButton('Player 4') // Sheriff investigates Player 5

  expect(
    screen.getByText(`Player 2 (Townie) was killed by Player 1 (Mafioso)`, {
      exact: false,
    })
  ).toBeInTheDocument()
  expect(
    screen.queryByText('Nothing happened during the night', {
      exact: false,
    })
  ).not.toBeInTheDocument()
})

test('Doctor heals a player', async () => {
  await setupGame([
    'Mafioso', // Player 1
    'Townie', // Player 2
    'Sheriff', // Player 3
    'Doctor', // Player 4
    'Townie', // Player 5
  ])

  clickOnButton('Player 2') // Mafioso kills Player 2
  clickOnButton('Player 2') // Doctor heals Player 2
  clickOnButton('Player 4') // Sheriff investigates Player 5

  expect(
    screen.getByText(`but healed`, {
      exact: false,
    })
  ).toBeInTheDocument()
})

test('Sheriff investigates', async () => {
  await setupGame([
    'Mafioso', // Player 1
    'Townie', // Player 2
    'Sheriff', // Player 3
    'Doctor', // Player 4
    'Townie', // Player 5
  ])

  clickOnButton('Player 2') // Mafioso kills Player 2
  clickOnButton('Player 3') // Doctor heals Player 3
  clickOnButton('Player 4') // Sheriff investigates Player 5

  expect(
    screen.getByText(`investigated`, {
      exact: false,
    })
  ).toBeInTheDocument()
})

test("Mafia can't select other mafia", async () => {
  await setupGame([
    'Mafioso', // Player 1
    'Mafioso', // Player 2
    'Sheriff', // Player 3
    'Doctor', // Player 4
    'Townie', // Player 5
  ])

  // Mafia choose a target to kill
  clickOnButton('Player 2') // Mafioso tries to target Player 2

  expect(
    screen.getByText(
      `Each night wake with the Mafia. You vote for a player to kill.`
    )
  ).toBeInTheDocument()
})

test('Mafia kills a player on first turn, but is healed on the second', async () => {
  await setupGame([
    'Mafioso', // Player 1
    'Townie', // Player 2
    'Sheriff', // Player 3
    'Doctor', // Player 4
    'Townie', // Player 5
  ])

  clickOnButton('Player 2') // Mafioso kills Player 2
  clickOnButton('Player 3') // Doctor heals Player 3
  clickOnButton('Player 4') // Sheriff investigates Player 5
  fireEvent.click(screen.getByText('Next step'))
  fireEvent.click(screen.getByText('Skip Hanging'))
  fireEvent.click(screen.getByText('Next step'))
  clickOnButton('Player 3') // Mafioso kills Player 3
  clickOnButton('Player 3') // Doctor heals Player 3
  clickOnButton('Player 1') // Sheriff investigates Player 5

  expect(
    screen.getByText(`Player 2 (Townie) was killed by Player 1 (Mafioso)`, {
      exact: false,
    })
  ).toBeInTheDocument()
})

test('Game history is updated with kill announcement', async () => {
  await setupGame([
    'Mafioso', // Player 1
    'Townie', // Player 2
    'Sheriff', // Player 3
    'Doctor', // Player 4
    'Townie', // Player 5
  ])

  clickOnButton('Player 2') // Mafioso kills Player 2
  clickOnButton('Player 3') // Doctor heals Player 3
  clickOnButton('Player 4') // Sheriff investigates Player 5

  expect(
    screen.getByText(`📢 Player 2 was killed and they were a Townie!`, {
      exact: false,
    })
  ).toBeInTheDocument()
})

test('Game history is updated with nothing happens announcement', async () => {
  await setupGame([
    'Mafioso', // Player 1
    'Townie', // Player 2
    'Sheriff', // Player 3
    'Doctor', // Player 4
    'Townie', // Player 5
  ])

  clickOnButton('Player 3') // Mafioso kills Player 3
  clickOnButton('Player 3') // Doctor heals Player 3
  clickOnButton('Player 4') // Sheriff investigates Player 5

  expect(
    screen.getByText(`📢 Nothing happened during the night.`, {
      exact: false,
    })
  ).toBeInTheDocument()
})

test('A game ends with Mafia winning', async () => {
  await setupGame([
    'Mafioso', // Player 1
    'Townie', // Player 2
    'Sheriff', // Player 3
    'Doctor', // Player 4
    'Townie', // Player 5
  ])

  // Night 1
  clickOnButton('Player 3') // Mafioso kills Player 3
  clickOnButton("Don't") // Doctor skips heal
  clickOnButton("Don't") // Sheriff skips investigate

  fireEvent.click(screen.getByText('Next step'))
  fireEvent.click(screen.getByText('Skip Hanging'))
  fireEvent.click(screen.getByText('Next step'))

  // Night 2
  clickOnButton('Player 2') // Mafioso kills Player 2
  clickOnButton("Don't") // Doctor skips heal

  fireEvent.click(screen.getByText('Next step'))
  fireEvent.click(screen.getByText('Skip Hanging'))
  fireEvent.click(screen.getByText('Next step'))

  // Night 3
  clickOnButton('Player 4') // Mafioso kills Player 4
  clickOnButton("Don't") // Doctor skips heal
  fireEvent.click(screen.getByText('Next step'))

  expect(
    screen.getAllByText(`Game over! Mafia won!`, {
      exact: false,
    })[0]
  ).toBeInTheDocument()
})

test('A game ends with Town winning by hanging the Mafioso', async () => {
  await setupGame([
    'Mafioso', // Player 1
    'Townie', // Player 2
    'Sheriff', // Player 3
    'Doctor', // Player 4
    'Townie', // Player 5
  ])

  // Night 1
  clickOnButton("Don't") // Mafioso skips kill
  clickOnButton("Don't") // Doctor skips heal
  clickOnButton("Don't") // Sheriff skips investigate

  fireEvent.click(screen.getByText('Next step'))
  clickOnButton('Player 1') // Town votes to hang Player 1
  clickOnButton('Hang selected player') // Town hangs Player 1
  expect(
    screen.getAllByText(`Game over! Town won!`, {
      exact: false,
    })[0]
  ).toBeInTheDocument()
})

test('Two games are played consecutively', async () => {
  await setupGame([
    'Mafioso', // Player 1
    'Townie', // Player 2
    'Sheriff', // Player 3
    'Doctor', // Player 4
    'Townie', // Player 5
  ])

  // Night 1
  clickOnButton("Don't") // Mafioso skips kill
  clickOnButton("Don't") // Doctor skips heal
  clickOnButton("Don't") // Sheriff skips investigate

  fireEvent.click(screen.getByText('Next step'))
  clickOnButton('Player 1') // Town votes to hang Player 1
  clickOnButton('Hang selected player') // Town hangs Player 1
  expect(
    screen.getAllByText(`Game over! Town won!`, {
      exact: false,
    })[0]
  ).toBeInTheDocument()
  fireEvent.click(screen.getByText('Start again'))
  expect(
    screen.getAllByText(`Setup Players`, {
      exact: false,
    })[0]
  ).toBeInTheDocument()
})

test('A jester hangs a player', async () => {
  await setupGame([
    'Mafioso', // Player 1
    'Townie', // Player 2
    'Sheriff', // Player 3
    'Doctor', // Player 4
    'Jester', // Player 5
  ])

  // Night 1
  clickOnButton("Don't") // Mafioso skips kill
  clickOnButton("Don't") // Doctor skips heal
  clickOnButton("Don't") // Sheriff skips investigate

  fireEvent.click(screen.getByText('Next step'))
  fireEvent.click(
    screen.getAllByText('Player 5', {
      exact: false,
    })[0]
  )
  fireEvent.click(screen.getByText('Hang selected player'))
  fireEvent.click(
    screen.getAllByText('Player 4', {
      exact: false,
    })[0]
  )

  fireEvent.click(
    screen.getByText('Haunt selected player', {
      exact: false,
    })
  )

  expect(
    screen.getAllByText(`Player 4 (Doctor) was haunted`, {
      exact: false,
    })[0]
  ).toBeInTheDocument()
})

test('A Godfather without other mafia kills a player', async () => {
  await setupGame([
    'Godfather', // Player 1
    'Townie', // Player 2
    'Sheriff', // Player 3
    'Doctor', // Player 4
    'Townie', // Player 5
  ])

  clickOnButton('Player 2') // Godfather kills Player 2
  clickOnButton('Player 3') // Doctor heals Player 3
  clickOnButton('Player 4') // Sheriff investigates Player 5

  expect(
    screen.getByText(`Player 2 (Townie) was killed by Player 1 (Godfather)`, {
      exact: false,
    })
  ).toBeInTheDocument()
})

test('A Vigilante kills a player', async () => {
  await setupGame([
    'Mafioso', // Player 1
    'Vigilante', // Player 2
    'Sheriff', // Player 3
    'Doctor', // Player 4
    'Townie', // Player 5
  ])

  clickOnButton('Player 2') // Mafioso kills Player 2
  clickOnButton('Player 4') // Vigilante kills Player 4
  clickOnButton('Player 3') // Doctor heals Player 3
  clickOnButton('Player 4') // Sheriff investigates Player 5

  expect(
    screen.getByText(`Player 4 (Doctor) was killed by Player 2 (Vigilante)`, {
      exact: false,
    })
  ).toBeInTheDocument()
})

test('A Survivor is not killed', async () => {
  await setupGame([
    'Mafioso', // Player 1
    'Townie', // Player 2
    'Sheriff', // Player 3
    'Doctor', // Player 4
    'Survivor', // Player 5
  ])

  clickOnButton('Player 5') // Mafioso tries to kill Player 5
  clickOnButton('Player 2') // Doctor heals Player 2
  clickOnButton('Player 4') // Sheriff investigates Player 5

  expect(
    screen.getByText(`but was immune`, {
      exact: false,
    })
  ).toBeInTheDocument()
})
