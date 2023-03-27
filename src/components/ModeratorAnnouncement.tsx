import { useGameContext } from '../contexts/GameContext'

export default function ModeratorAnnouncement() {
  const {
    night,
    goToGameState,
    announcement,
    addItemToHistory,
    resetAnnouncement,
    removeActionAndStatus,
  } = useGameContext()
  const nothingHappenedText = 'Nothing happened during the night.'

  const handleNextStep = () => {
    removeActionAndStatus()
    resetAnnouncement()
    addItemToHistory(`☀️ Day #${night}`)
    goToGameState('trial')
  }

  return (
    <div>
      <h2>📢 Moderator Announcement</h2>
      <div>
        {announcement?.length
          ? announcement.map((text, index) => {
              return <div key={index}>{text}</div>
            })
          : nothingHappenedText}
      </div>
      <button onClick={handleNextStep}>Next step</button>
    </div>
  )
}
