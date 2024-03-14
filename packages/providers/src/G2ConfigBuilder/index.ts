export * from './RequestProps'
export interface I2Config {
  url: string
}

export interface PlatformConfig {
  url: string
}

export const imConfig: () => I2Config = () => {
  // @ts-ignore
  return window._env_?.config?.im
}

export interface FsConfig {
  url: string
}

export const fsConfig: () => FsConfig = () => {
  // @ts-ignore
  return window._env_?.config?.fs
}

export const platFormConfig: () => FsConfig = () => {
  // @ts-ignore
  return window._env_?.config?.platform
}

export interface G2Config {
  keycloak: {
    realm: string
    clientId: string
    url: string
  }
  platform: PlatformConfig
  im: I2Config
  fs: FsConfig
}

export const G2ConfigBuilder = (config: G2Config) => {
  // @ts-ignore
  window._env_ = {
    // @ts-ignore
    ...window._env_,
    config: {
      // @ts-ignore
      ...window._env_?.config,
      ...config
    }
  }
}

export const g2Config: () => G2Config = () => {
  // @ts-ignore
  return window._env_?.config
}
