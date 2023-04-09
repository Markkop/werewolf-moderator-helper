import { useGameContext } from '../contexts/GameContext'
import { Player } from '../interfaces'

export default function SkipButton({
  onClick,
  player,
}: {
  onClick: () => void
  player: Player
}) {
  const { addItemToHistory } = useGameContext()
  const verb = player.role.night.action

  return (
    <div>
      <button
        onClick={() => {
          addItemToHistory(`⏭️ The ${player.role.name} didn't ${verb} anyone`)
          onClick()
        }}
      >
        {`⏭️ Don't ${verb} anyone`}
      </button>
    </div>
  )
}
