import { useGameContext } from '../contexts/GameContext'

export default function SkipButton({ onClick, role = 'default' }) {
  const { addItemToHistory } = useGameContext()
  const skipText = {
    Mafioso: {
      button: "⏭️ Don't kill anyone",
      history: "⏭️ The Mafioso didn't kill anyone",
    },
    Doctor: {
      button: "⏭️ Don't heal anyone",
      history: "⏭️ The  Doctor didn't heal anyone",
    },
    Sheriff: {
      button: "⏭️ Don't investigate anyone",
      history: "⏭️ The Sheriff didn't investigate anyone",
    },
    default: {
      button: '⏭️ Skip',
      history: '⏭️ Skipped their action',
    },
  }

  return (
    <div>
      <button
        onClick={() => {
          addItemToHistory(skipText[role].history)
          onClick()
        }}
      >
        {skipText[role].button}
      </button>
    </div>
  )
}
