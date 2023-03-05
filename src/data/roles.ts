import { Role } from "../interfaces";

export const existingRoles: Role[] = [
  {
    name: 'Townie',
    description: 'Find and kill the evildoers in the town.',
    alignment: 'Good',
    points: '1'
  },
  {
    name: 'Sheriff',
    description: 'Each night check if a player is "Good" or "Evil".',
    alignment: 'Good',
    points: '7'
  },
  {
    name: 'Mafioso',
    description: 'Each night wake with the Mafia. You vote for a player to kill.',
    alignment: 'Evil',
    points: '-6'
  },
]
