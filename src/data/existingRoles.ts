import { Role } from "../interfaces";

export const roleOrder: string[] = ["Mafioso", "Doctor", "Sheriff"]

export const existingRoles: Role[] = [
  {
    name: 'Townie',
    description: 'Find and kill the evildoers in the town.',
    alignment: 'Good',
    points: '1',
    faction: 'Town',
    hasNightAction: false,
  },
  {
    name: 'Sheriff',
    description: 'Each night check if a player is "Good" or "Evil".',
    alignment: 'Good',
    points: '7',
    faction: 'Town',
    hasNightAction: true,
  },
  {
    name: 'Doctor',
    description: 'Each night choose a player to heal. They cannot be killed that night.',
    alignment: 'Good',
    points: '4',
    faction: 'Town',
    hasNightAction: true,

  },
  {
    name: 'Mafioso',
    description: 'Each night wake with the Mafia. You vote for a player to kill.',
    alignment: 'Evil',
    points: '-6',
    faction: 'Mafia',
    hasNightAction: true,
  },
];