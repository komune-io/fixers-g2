import { useMemo } from 'react'
import { fsConfig, imConfig, platFormConfig } from '.'
import { useAuth } from '../KeycloakProvider'

export type RequestProps = {
  url: string
  jwt?: string
}

export const useNoAuthenticatedRequest = (
  endpoint: 'plateform' | 'im' | 'fs' = 'plateform'
): RequestProps => {
  return useMemo(
    () => ({
      url:
        endpoint === 'fs'
          ? fsConfig().url
          : endpoint === 'im'
          ? imConfig().url
          : platFormConfig().url
    }),
    []
  )
}

export const useAuthenticatedRequest = (
  endpoint: 'plateform' | 'im' | 'fs' = 'plateform'
): RequestProps => {
  const auth = useAuth()
  return useMemo(
    () => ({
      url:
        endpoint === 'fs'
          ? fsConfig().url
          : endpoint === 'im'
          ? imConfig().url
          : platFormConfig().url,
      jwt: auth.keycloak.token
    }),
    [auth.keycloak.token]
  )
}
