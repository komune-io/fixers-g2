import { Address, Roles, RoleType } from '../../Commons'

export const classes = `interface OrgCreationClasses {
  siretForm?: string
  leftForm?: string
  rightForm?: string
  dropPictureBox?: string
  actionsContainer?: string
  infoPopover?: string
}`
export const styles = `interface OrgCreationStyles {
  siretForm?: React.CSSProperties
  leftForm?: React.CSSProperties
  rightForm?: React.CSSProperties
  dropPictureBox?: React.CSSProperties
  actionsContainer?: React.CSSProperties
  infoPopover?: React.CSSProperties
}`

export type OrganizationId = string

export type OrganizationRef = {
  id: OrganizationId
  name: string
  roles: string[]
}

export interface Organization {
  attributes?: any
  id: OrganizationId
  siret?: string
  name: string
  roles?: RoleType[]
  rolesComposites?: Roles
  description?: string
  website?: string
  address?: Address
  image?: string
}

export interface FlatOrganization {
  id: OrganizationId
  siret?: string
  name: string
  roles?: string[]
  description?: string
  website?: string
  image?: string
  street?: string
  postalCode?: string
  city?: string
}

export type OrganizationCreateCommand = Organization
export type OrganizationUpdateCommand = Organization

export type OrganizationPageQuery = {
  search?: string
  type?: string
  page: number
  size: number
}

export interface OrganizationPageResult<T extends Organization> {
  items: T[]
  total: number
}

export type OrganizationGetQuery = {
  id: OrganizationId
}

export type OrganizationGetResult<T extends Organization> = {
  item: T
}

export const organizationToFlatOrganization = (
  org: Organization
): FlatOrganization => {
  const flat: FlatOrganization & { address?: Address } = {
    ...org,
    street: org.address?.street,
    city: org.address?.city,
    postalCode: org.address?.postalCode,
    roles: org.roles && org.roles.length > 0 ? org.roles : undefined
  }
  delete flat.address
  return flat
}

export const flatOrganizationToOrganization = (
  flat: FlatOrganization,
  multipleRoles: boolean
): Organization => {
  const org: Organization & {
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
    //@ts-ignore
    roles: multipleRoles ? flat.roles : [flat.roles]
  }
  delete org.street
  delete org.city
  delete org.postalCode
  return org
}
