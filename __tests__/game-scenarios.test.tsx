import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { GameProvider } from '../src/contexts/GameContext'
import IndexPage from '../src/pages/index'

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

describe('Game Scenarios', () => {
  test('Doctor saves target from Mafia kill', async () => {
    await setupGame([
      'Mafioso', // Player 1
      'Townie', // Player 2
      'Sheriff', // Player 3
      'Doctor', // Player 4
      'Townie', // Player 5
    ])

    clickOnButton('Player 2') // Mafioso targets Player 2
    clickOnButton('Player 2') // Doctor saves Player 2
    clickOnButton('Player 1') // Sheriff investigates Player 1

    expect(
      screen.getByText(`📢 Nothing happened during the night.`, {
        exact: false,
      })
    ).toBeInTheDocument()
  })

  test('Game continues after player death', async () => {
    await setupGame([
      'Mafioso', // Player 1
      'Townie', // Player 2
      'Sheriff', // Player 3
      'Doctor', // Player 4
      'Townie', // Player 5
    ])

    // Night 1
    clickOnButton('Player 2') // Mafioso kills Player 2
    clickOnButton('Player 3') // Doctor heals Player 3
    clickOnButton('Player 1') // Sheriff investigates Player 1

    fireEvent.click(screen.getByText('Next step'))
    fireEvent.click(screen.getByText('Skip Hanging'))
    fireEvent.click(screen.getByText('Next step'))

    // Night 2
    expect(
      screen.getByText(`Night 2`, {
        exact: false,
      })
    ).toBeInTheDocument()
  })

  test('Town wins by majority vote', async () => {
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
    clickOnButton('Player 1') // Sheriff investigates Player 1

    fireEvent.click(screen.getByText('Next step'))
    clickOnButton('Player 1') // Select Player 1 for hanging
    clickOnButton('Hang selected player')

    expect(
      screen.getAllByText(`Game over! Town won!`, {
        exact: false,
      })[0]
    ).toBeInTheDocument()
  })

  test('Game history tracks multiple nights', async () => {
    await setupGame([
      'Mafioso', // Player 1
      'Townie', // Player 2
      'Sheriff', // Player 3
      'Doctor', // Player 4
      'Townie', // Player 5
    ])

    // Night 1
    clickOnButton('Player 2') // Mafioso kills Player 2
    clickOnButton('Player 3') // Doctor heals Player 3
    clickOnButton('Player 1') // Sheriff investigates Player 1

    fireEvent.click(screen.getByText('Next step'))
    fireEvent.click(screen.getByText('Skip Hanging'))
    fireEvent.click(screen.getByText('Next step'))

    // Night 2
    clickOnButton('Player 3') // Mafioso targets Player 3
    clickOnButton('Player 3') // Doctor saves Player 3
    clickOnButton('Player 5') // Sheriff investigates Player 5

    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(3)
  })

  test('Clear history functionality works', async () => {
    await setupGame([
      'Mafioso', // Player 1
      'Townie', // Player 2
      'Sheriff', // Player 3
      'Doctor', // Player 4
      'Townie', // Player 5
    ])

    // Night 1
    clickOnButton('Player 2') // Mafioso kills Player 2
    clickOnButton('Player 3') // Doctor heals Player 3
    clickOnButton('Player 1') // Sheriff investigates Player 1

    fireEvent.click(screen.getByText('Clear history'))

    expect(screen.queryAllByRole('listitem').length).toBe(0)
  })

  test('Dead players cannot perform night actions', async () => {
    await setupGame([
      'Mafioso', // Player 1
      'Townie', // Player 2
      'Sheriff', // Player 3
      'Doctor', // Player 4
      'Townie', // Player 5
    ])

    // Night 1
    clickOnButton('Player 4') // Mafioso kills Doctor
    clickOnButton('Player 3') // Doctor heals Player 3
    clickOnButton('Player 1') // Sheriff investigates Player 1

    fireEvent.click(screen.getByText('Next step'))
    fireEvent.click(screen.getByText('Skip Hanging'))
    fireEvent.click(screen.getByText('Next step'))

    // Night 2
    expect(
      screen.queryByText('Doctor heals', { exact: false })
    ).not.toBeInTheDocument()
  })
})
