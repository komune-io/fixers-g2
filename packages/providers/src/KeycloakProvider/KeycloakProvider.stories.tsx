import React from 'react'
import { KeycloakProvider as AruiKeycloakProvider } from './KeycloakProvider'
import { StoryObj, Meta, StoryFn } from '@storybook/react'
import { useAuth, KeycloackService, AuthedUser } from './useAuth'
import { Button } from '@komune-io/g2-components'
import { Typography } from '@mui/material'
import {
  ArgTypes,
  PRIMARY_STORY,
  Subtitle,
  Primary,
  Description
} from '@storybook/addon-docs'
import { CodeHighlighter } from '@komune-io/g2-documentation'
import {
  localUseAuth,
  staticUseAuth,
  reactOidcTrustedDomains,
  reactOidcConfig,
  informRoles,
  checkRoles
} from './docs'

export default {
  title: 'Providers/KeycloakProvider',
  component: AruiKeycloakProvider,
  parameters: {
    docs: {
      page: () => (
        <>
          <Primary />
          <ArgTypes of={PRIMARY_STORY} />
          <Description>
            The provider is based on the
            [react-oidc](https://github.com/AxaFrance/oidc-client) library from
            Axa.
          </Description>
          <Description>
            If you want to have the service worker from it in your project add
            @axa-fr/oidc-client in your project depedencies and install it in
            the root of your react project. The service worker will be added in
            the public directory as well as the `OidcTrustedDomains.js` file
            that you just fill up like this:
          </Description>
          <CodeHighlighter code={reactOidcTrustedDomains} />
          <Description>
            Here is the basic react oidc config for the provider you can find
            the details of the complete config here:
            https://github.com/AxaFrance/oidc-client/blob/main/packages/react-oidc/README.md#application-startup
          </Description>
          <CodeHighlighter code={reactOidcConfig} />
          <Subtitle>The hook useAuth</Subtitle>
          <Description>
            This hook allow you to have access of the react oidc instance and
            utility functions. You can statically extends the autService like
            so:
          </Description>
          <CodeHighlighter code={staticUseAuth} />
          <Description>
            Keycloak instance will be automatically injected to every extending
            functions. ⚠️ You have to inform the hook about the return type
            `ReturnType` of the function and the prameters type `ParamsType`. To
            dynamically extends the authService you can do it like so:
          </Description>
          <CodeHighlighter code={localUseAuth} />
          <Description>
            The authService contains already 2 functions. One for verifying if
            the current user has the wanted roles `isAuthorized` and another one
            to get the current user id `getUserId`.
          </Description>
          <Description>
            You can inform the roles by giving a type to the useAuth hook. ⚠️
            Your additional services should be inform of those roles as well:
          </Description>
          <CodeHighlighter code={informRoles} />
          <Description>
            in return you will get few services that will allow you to check the
            role of the current user.
          </Description>
          <CodeHighlighter code={checkRoles} />
        </>
      )
    }
  }
} as Meta<typeof AruiKeycloakProvider>

export const KeycloakProvider: StoryObj = {
  render: () => {
    return (
      <AruiKeycloakProvider>
        <ConnectButton />
      </AruiKeycloakProvider>
    )
  },

  name: 'KeycloakProvider'
}

type Roles = 'admin' | 'user'

const roles: Roles[] = ['admin', 'user']

type StaticServices = {
  getRoles: { returnType: Roles[] | undefined; paramsType: { test: boolean } }
}

const staticServices: KeycloackService<StaticServices, Roles> = {
  getRoles: (keycloak, services) => {
    return keycloak.tokenParsed?.realm_access?.roles
  }
}

function MyObject() {
  // Initialize properties specific to each instance here
}

MyObject.prototype.canUploadInvoice = (
  authedUser: AuthedUser,
  str: string,
  arr: any[]
) => true
MyObject.prototype.canCancelOrder = (authedUser: AuthedUser, str: string) =>
  true
//We creating an object with oy a prototype to imitate the policie coming from the back
const orderPolicies = new MyObject()

const policies = {
  orderPolicies
}

const useExtendedAuth = () => {
  return useAuth<StaticServices, Roles, typeof policies>(
    roles,
    staticServices,
    policies
  )
}

const ConnectButton = () => {
  const { keycloak, policies } = useExtendedAuth()

  console.log(policies)
  if (keycloak.isAuthenticated) {
    return (
      <>
        <Typography>
          The token you received from the authentication server:
        </Typography>
        <CodeHighlighter object={keycloak.tokenParsed} />
        <Button onClick={() => keycloak.logout()}>
          Disconnect from Smartb
        </Button>
      </>
    )
  }
  return <Button onClick={() => keycloak.login()}>Connect with Smartb</Button>
}
