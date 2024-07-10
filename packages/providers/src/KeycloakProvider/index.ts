export * from './useAuth'
export * from './KeycloakProvider'

import oidcPkg from '@axa-fr/react-oidc'
export const { OidcSecure, withOidcSecure } = oidcPkg
