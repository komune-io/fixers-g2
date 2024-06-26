import { Roles, RoleType } from '../../Commons'
import { OrganizationRef } from '../../Organization'

export const classes = `export interface UserCreationClasses {
  leftForm?: string
  rightForm?: string
  actionsContainer?: string
}`
export const styles = `export interface UserCreationStyles {
  leftForm?: React.CSSProperties
  rightForm?: React.CSSProperties
  actionsContainer?: React.CSSProperties
}`

export type UserId = string

export interface Address {
  street: string
  postalCode: string
  city: string
}

export interface User {
  attributes?: any
  id: UserId
  memberOf?: OrganizationRef
  familyName: string
  givenName: string
  address?: Address
  email: string
  roles?: RoleType[]
  rolesComposites?: Roles
  phone?: string
  sendEmailLink?: boolean
}

export interface FlatUser {
  id: UserId
  memberOf?: string
  familyName: string
  givenName: string
  email: string
  roles?: string[]
  phone?: string
  sendEmailLink?: boolean
  street?: string
  postalCode?: string
  city?: string
}

export const userToFlatUser = (user: User): FlatUser => {
  const flat: FlatUser & { address?: Address } = {
    ...user,
    street: user.address?.street,
    city: user.address?.city,
    postalCode: user.address?.postalCode,
    memberOf: user.memberOf?.id,
    roles: user.roles
  }
  delete flat.address
  return flat
}

export const flatUserToUser = (flat: FlatUser): User => {
  // @ts-ignore
  const user: User & {
    street?: string
    city?: string
    postalCode?: string
  } = {
    ...flat,
    address: {
      street: flat.street ?? '',
      city: flat.city ?? '',
      postalCode: flat.postalCode ?? ''
    },
    memberOf: {
      id: flat.memberOf ?? '',
      name: '',
      roles: []
    },
    roles: transformRoles(flat.roles)
  }
  delete user.street
  delete user.city
  delete user.postalCode
  return user
}

export interface UserPageQuery {
  name?: string
  role?: string
  page?: number
  size?: number
  email?: string
  organizationId?: string
}

export interface UserPageResult<T extends User> {
  items: T[]
  total: number
}

export interface UserUpdatePasswordCommand {
  id: UserId
  password: string
}

export interface UserUpdatePasswordResult {
  id: UserId
}
export interface UserResetPasswordCommand {
  id: UserId
}

export interface UserUpdateEmailCommand {
  id: UserId
  email: string
}

export interface UserUpdatedEmailEvent {
  id: UserId
}

type WithIdentifier = { identifier: string }

function transformRoles(
  roles: WithIdentifier | WithIdentifier[] | string | string[] | undefined
): string[] {
  if (roles === undefined) {
    return []
  }

  // Wrap roles in an array if it's not already an array
  const rolesArray = Array.isArray(roles) ? roles : [roles]

  // Flatten the roles array and transform objects with id property to their id string
  return rolesArray.map((role) => {
    if (typeof role === 'string') {
      return role
    } else if (typeof role === 'object') {
      return role.identifier
    }
    return ''
  })
}
