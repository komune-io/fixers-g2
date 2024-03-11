export const staticUseAuth = `
interface CustomToken {
  token?: string,
  tokenParsed?: Keycloak.KeycloakTokenParsed
}

type StaticServices = {
  getToken: { returnType: CustomToken, paramsType: {withParse?: boolean}},
}

const staticServices: KeycloackService<StaticServices> = {
  getToken: (keycloack, params) => {
    if (params?.withParse) {
      return {
        token: keycloack.token,
        tokenParsed: keycloack.tokenParsed
      }
    }
    return {
      token: keycloack.token
    }
  }
}

const useExtendedAuth = () => useAuth<StaticServices>(staticServices)
`

export const localUseAuth = `
const useExtendedAuth = (extension: string) => {

  type DynamicServices = {
    getExToken: { returnType: string},
  }

  const services: KeycloackService<StaticServices & DynamicServices> = useMemo(() => ({
    ...staticServices,
    getExToken: (keycloack, services, params) => {
      if (!keycloack.token) return extension
      return keycloack.token + extension
    }
  }), [extension])

  return useAuth<StaticServices & DynamicServices>(services)
}
`

export const reactOidcConfig = `
const oidcConfiguration: OidcConfiguration = {
  client_id: g2Config().keycloak.clientId,
  redirect_uri: window.location.origin + '/authentication/callback',
  silent_redirect_uri: window.location.origin + '/authentication/silent-callback',
  scope: 'openid',
  authority: g2Config().keycloak.url + '/realms/' + g2Config().keycloak.realm,
  service_worker_relative_url: '/OidcServiceWorker.js',
  storage: localStorage,
  service_worker_only: false,
}
`

export const reactOidcTrustedDomains = `
const trustedDomains = {
  default: [
      //the application root
      'http://...', 
      //the keycloak server
      "https://...", 
      //the api url
      "https://..."
  ],
  config_classic: ['http://..'], //the application root
  config_without_silent_login: ['http://...'], //the application root
  config_without_refresh_token: ['http://...'], //the application root
  config_without_refresh_token_silent_login: ['http://...'], //the application root
};

// Service worker will continue to give access token to the JavaScript client
// Ideal to hide refresh token from client JavaScript, but to retrieve access_token for some
// scenarios which require it. For example, to send it via websocket connection.
trustedDomains.config_show_access_token = { domains: ['http://...'], showAccessToken: true }; //the application root

// This example defines domains used by OIDC server separately from domains to which access tokens will be injected.
trustedDomains.config_separate_oidc_access_token_domains = {
  oidcDomains: ['http://...'], //the application root
  accessTokenDomains: ["https://..."], //the keycloak server
};
`

export const informRoles = `
type Roles = 'admin' | 'user'

const roles: Roles[] = ['admin', 'user']

type StaticServices = {
  getRoles: { returnType: Roles[] | undefined; paramsType: { test: boolean } }
}

const staticServices: KeycloackService<StaticServices, Roles> = {
  getRoles: (keycloak) => {
    return keycloak.tokenParsed?.realm_access?.roles
  }
}

const useExtendedAuth = () => {
  return useAuth<StaticServices, Roles>(roles, staticServices)
}
`

export const checkRoles = `
const { keycloak, service } = useExtendedAuth()
service.is_user()
service.is_admin()
`
