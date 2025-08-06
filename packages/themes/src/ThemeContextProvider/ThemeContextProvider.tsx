import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import { ThemeProvider, ThemeOptions, useMediaQuery } from '@mui/material'
import { defaultMaterialUiTheme, defaultTheme, Theme } from './Theme'
import { mergeDeepRight } from 'ramda'
import { DeepPartial } from '@komune-io/g2-utils'
import { useDidUpdate } from '@mantine/hooks'

//@ts-ignore
declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export interface ThemePermanentHeaderProps {
  toggleOpenDrawer: () => void
  openDrawer: boolean
}

export interface ThemeContextProps<T extends {} = {}>
  extends ThemePermanentHeaderProps {
  theme: Theme<T>
  changeTheme: (theme: Partial<Theme>) => void
  openDrawer: boolean
  setOpenDrawer: (open: boolean) => void
  toggleOpenDrawer: () => void
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultTheme,
  changeTheme: () => {},
  openDrawer: false,
  setOpenDrawer: () => {},
  toggleOpenDrawer: () => {}
})

export interface ThemeContextProviderProps<T extends {} = {}> {
  children: ReactNode
  theme?: DeepPartial<Theme<T>>
  customMuiTheme?: Partial<ThemeOptions>
  defaultOpenDrawer?: boolean
}

export const ThemeContextProvider = <T extends {} = {}>(
  props: ThemeContextProviderProps<T>
) => {
  const { children, customMuiTheme, theme, defaultOpenDrawer } = props
  const [localTheme, setLocalTheme] = useState<Theme>(
    theme ? mergeDeepRight(defaultTheme, theme as any) : defaultTheme
  )

  const setPartialTheme = useCallback((partialTheme: Partial<Theme>) => {
    setLocalTheme((oldLocalTheme) =>
      mergeDeepRight(oldLocalTheme, partialTheme as any)
    )
  }, [])
  const defaultMuiTheme = useMemo(
    () => defaultMaterialUiTheme(localTheme, customMuiTheme),
    [customMuiTheme, localTheme]
  )

  const isMobile =
    localTheme.drawerAbsolutePositionBreakpoint === 'always'
      ? true
      : useMediaQuery(
          defaultMuiTheme.breakpoints.down(
            localTheme.drawerAbsolutePositionBreakpoint!
          )
        )

  const [openDrawer, setOpenDrawer] = useState(defaultOpenDrawer ?? !isMobile)

  useDidUpdate(() => {
    if (isMobile) {
      setOpenDrawer(false)
    } else {
      setOpenDrawer(true)
    }
  }, [isMobile])

  const toggleOpenDrawer = useCallback(() => {
    setOpenDrawer((prevOpen) => !prevOpen)
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        theme: localTheme,
        changeTheme: setPartialTheme,
        openDrawer,
        setOpenDrawer,
        toggleOpenDrawer
      }}
    >
      <ThemeProvider theme={defaultMuiTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = <T extends {} = {}>() => {
  const themeContext = useContext(ThemeContext)
  return themeContext.theme as Theme<T>
}

export const useThemeContext = () => {
  return useContext(ThemeContext)
}
