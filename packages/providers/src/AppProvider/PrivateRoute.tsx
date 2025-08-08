import { Route } from 'react-router-dom'
import { useAuth } from '../KeycloakProvider'
import { NoMatchPage } from './NoMatchPage'
import { ReactElement } from 'react'

interface PrivateRouteBasicProps<Roles extends string = string> {
  /**
   * The roles that the user must have one of them to access the route
   *
   * It must be the same roles type you passed to the useAuth hook configuration
   */
  roles: Roles[]
  /**
   * By default the unauthorized redirection goes to the `NoMatchPage` component but you can override it with this prop
   *
   * @default NoMatchPage
   */
  unauthorizedComponent?: JSX.Element
  /**
   * The component to render when authorized
   */
  element: ReactElement
  /**
   * The path for the route
   */
  path: string
}

export type PrivateRouteProps<Roles extends string = string> =
  PrivateRouteBasicProps<Roles>

export const PrivateRoute = <Roles extends string = string>(
  props: PrivateRouteProps<Roles>
): JSX.Element => {
  const { roles, unauthorizedComponent, element, path } = props
  const { service } = useAuth<Roles>()

  return (
    <Route
      path={path}
      element={
        service.hasRole(roles)
          ? element
          : unauthorizedComponent || <NoMatchPage />
      }
    />
  )
}
