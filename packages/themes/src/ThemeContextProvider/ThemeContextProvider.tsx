import React, { createContext, useCallback, useContext } from 'react'
import {
  ThemeProvider,
  StyledEngineProvider,
  ThemeOptions
} from '@mui/material'
import { defaultMaterialUiTheme, defaultTheme, Theme } from './Theme'

import './default.css'

//@ts-ignore
declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export interface ThemeContextProps {
  theme: Theme
  changeTheme: (theme: Partial<Theme>) => void
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultTheme,
  changeTheme: () => {}
})

export interface ThemeContextProviderProps {
  children: React.ReactNode
  theme?: Theme | any
  customMuiTheme?: Partial<ThemeOptions>
}

export const ThemeContextProvider = (props: ThemeContextProviderProps) => {
  const { children, customMuiTheme, theme } = props
  const [localTheme, setLocalTheme] = React.useState<Theme>({
    ...{ ...defaultTheme, ...theme },
    ...props.theme
  })
  const setPartialTheme = useCallback((partialTheme: Partial<Theme>) => {
    setLocalTheme((oldLocalTheme) => ({ ...oldLocalTheme, ...partialTheme }))
  }, [])
  const defaultMuiTheme = defaultMaterialUiTheme(localTheme, customMuiTheme)
  return (
    <ThemeContext.Provider
      value={{ theme: localTheme, changeTheme: setPartialTheme }}
    >
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={defaultMuiTheme}>{children}</ThemeProvider>
      </StyledEngineProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const themeContext = useContext(ThemeContext)
  return themeContext.theme
}

export const useThemeContext = () => {
  return useContext(ThemeContext)
}
