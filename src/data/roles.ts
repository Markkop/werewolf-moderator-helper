import { Role } from '../interfaces'
import { handleAction } from '../utils/actionHandlers/default'
import { handleMafiosoAction } from '../utils/actionHandlers/mafioso'

export const roleOrder: string[] = ['Mafioso', 'Godfather', 'Vigilante', 'Doctor', 'Sheriff']

export const existingRoles: Role[] = [
  {
    name: 'Townie',
    description: 'Find and kill the evildoers in the town.',
    alignment: 'Good',
    virtueValue: '1',
    faction: 'Town',
  },
  {
    name: 'Sheriff',
    description: 'Each night check if a player is "Good" or "Evil".',
    alignment: 'Good',
    virtueValue: '7',
    faction: 'Town',
    night: {
      action: 'investigate',
      handler: handleAction,
    }
  },
  {
    name: 'Doctor',
    description:
      'Each night choose a player to heal. They cannot be killed that night.',
    alignment: 'Good',
    virtueValue: '4',
    faction: 'Town',
    night: {
      action: 'heal',
      handler: handleAction
    }
  },
  {
    name: 'Mafioso',
    description:
      'Each night wake with the Mafia. You vote for a player to kill.',
    alignment: 'Evil',
    virtueValue: '-6',
    faction: 'Mafia',
    night: {
      action: 'kill',
      handler: handleMafiosoAction
    }
  },
  {
    name: 'Godfather',
    description:
      'Each night wake with the Mafia. You vote for a player to kill.',
    alignment: 'Evil',
    virtueValue: '-8',
    faction: 'Mafia',
    isUnique: true,
    night: {
      action: 'kill',
      handler: handleMafiosoAction
    }
  },
  {
    name: 'Jester',
    description:
      'You win if you are hanged. You may immediately kill one of your guilty voters.',
    alignment: 'Good',
    virtueValue: '-1',
    faction: 'Neutral',
  },
  {
    name: 'Vigilante',
    description: 'Each night you may choose a player to shoot, killing them. You have one arrow.',
    alignment: 'Good',
    virtueValue: '5',
    faction: 'Town',
    night: {
      action: 'kill',
      handler: handleAction
    }
  },
  {
    name: 'Survivor',
    description: 'Find and kill the evildoers in the town. You cannot be killed at night.',
    alignment: 'Good',
    virtueValue: '4',
    faction: 'Town',
    night: {
      immune: true
    }
  }
]
