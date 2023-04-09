import { Role } from '../interfaces'

export const roleOrder: string[] = ['Mafioso', 'Godfather', 'Doctor', 'Sheriff']

export const existingRoles: Role[] = [
  {
    name: 'Townie',
    description: 'Find and kill the evildoers in the town.',
    alignment: 'Good',
    virtueValue: '1',
    faction: 'Town',
    hasNightAction: false,
  },
  {
    name: 'Sheriff',
    description: 'Each night check if a player is "Good" or "Evil".',
    alignment: 'Good',
    virtueValue: '7',
    faction: 'Town',
    hasNightAction: true,
  },
  {
    name: 'Doctor',
    description:
      'Each night choose a player to heal. They cannot be killed that night.',
    alignment: 'Good',
    virtueValue: '4',
    faction: 'Town',
    hasNightAction: true,
  },
  {
    name: 'Mafioso',
    description:
      'Each night wake with the Mafia. You vote for a player to kill.',
    alignment: 'Evil',
    virtueValue: '-6',
    faction: 'Mafia',
    hasNightAction: true,
  },
  {
    name: 'Godfather',
    description:
      'Each night wake with the Mafia. You vote for a player to kill.',
    alignment: 'Evil',
    virtueValue: '-8',
    faction: 'Mafia',
    hasNightAction: true,
  },
  {
    name: 'Jester',
    description:
      'You win if you are hanged. You may immediately kill one of your guilty voters.',
    alignment: 'Good',
    virtueValue: '-1',
    faction: 'Neutral',
    hasNightAction: false,
  },
]
