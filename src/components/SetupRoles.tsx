import React from 'react'
import { useGameContext } from '../contexts/GameContext'
import { allRoles } from '../data/roles'
import { Role } from '../interfaces'
import { assignRolesToPlayers } from '../utils/roles'

export default function SetupRoles() {
  const {
    players,
    roles,
    updatePlayer,
    goToGameState,
    customRolesOrder,
    addItemToHistory,
    addRole,
    removeRoleByIndex,
  } = useGameContext()
  const handleAddRole = (role: Role) => {
    addRole(role)
  }

  const handleRemoveRole = (index: number) => {
    removeRoleByIndex(index)
  }

  const handleNextStep = () => {
    assignRolesToPlayers(
      players,
      roles,
      customRolesOrder,
      updatePlayer,
      addItemToHistory
    )

    goToGameState('sleep')
  }

  const hasEnoughRoles = roles.length === players.length

  const uniqueRoles = allRoles.filter((role) => role.isUnique)
  return (
    <div>
      <h2>Setup Roles</h2>
      <ul>
        {roles.map((role, index) => (
          <li key={index}>
            {role.name}{' '}
            <button onClick={() => handleRemoveRole(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Add roles</h3>
        <ul>
          {allRoles.map((role) => (
            <li key={role.name}>
              {role.name}{' '}
              <button
                onClick={() => handleAddRole(role)}
                disabled={uniqueRoles.includes(role) && roles.includes(role)}
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleNextStep} disabled={!hasEnoughRoles}>
        {hasEnoughRoles ? 'Next step' : `You need ${players.length} roles`}
      </button>
    </div>
  )
}
