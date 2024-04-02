import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  Suspense,
  lazy
} from 'react'
import { LatLngExpression, Map as LeafletMap } from 'leaflet'
import {
  FormHelperText,
  IconButton,
  Stack,
  StackProps,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { Button } from '@komune-io/g2-components'
import { CloseRounded } from '@mui/icons-material'
import L from 'leaflet'
import { BasicProps, MergeMuiElementProps } from '@komune-io/g2-themes'
import { cx } from '@emotion/css'
import { useTranslation } from 'react-i18next'
import 'leaflet/dist/leaflet.css'
import { markerIcon, markerIcon2x, markerShadow } from './leafletImages'

// Import only the types and components you need
import { MapContainerProps, TileLayerProps } from 'react-leaflet'

const LazyLeafletMap = lazy(() => import('./LeafletMap'))
// Ensure DraggableMarker has a default export
const DraggableMarker = lazy(() => import('./DraggableMarker'))

// Modify Leaflet's icon path only in client-side environment
if (typeof window !== 'undefined') {
  L.Icon.Default.prototype.options.iconRetinaUrl = markerIcon2x
  L.Icon.Default.prototype.options.iconUrl = markerIcon
  L.Icon.Default.prototype.options.shadowUrl = markerShadow
  /* eslint-disable react/jsx-key */

  //@ts-ignore
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
  })
}

export const defaultPosition = { center: { lng: 2, lat: 46 }, zoom: 5 }

export interface MapPlugin {
  key: string
  value?: any
  setValue?: (value: any) => void
  element: React.ElementType<any>
}

export interface MapPluginProps extends MapPlugin {
  map?: LeafletMap
  readOnly: boolean
  isMobile: boolean
  isFullScreen: boolean
}

export interface MapClasses {
  map?: string
  openFullScreenButton?: string
  closeFullScreenIcon?: string
  errorMessage?: string
}

export interface MapStyles {
  map?: React.CSSProperties
  openFullScreenButton?: React.CSSProperties
  closeFullScreenIcon?: React.CSSProperties
  errorMessage?: React.CSSProperties
}

export interface MapBasicProps extends BasicProps {
  children?: React.ReactNode
  additionalPlugins?: (MapPlugin & Record<string, any>)[]
  draggableMarkerPlugin?: any // Adjust the type as necessary
  center?: LatLngExpression
  zoom?: number
  mapProps?: Partial<MapContainerProps>
  tileLayerProps?: Partial<TileLayerProps>
  readOnly?: boolean
  errorMessage?: string
  classes?: MapClasses
  styles?: MapStyles
}

export type MapProps = MergeMuiElementProps<StackProps, MapBasicProps>

export const Map = (props: MapProps) => {
  const {
    children,
    draggableMarkerPlugin,
    center,
    zoom = !center ? defaultPosition.zoom : 17,
    additionalPlugins,
    sx,
    readOnly = false,
    errorMessage,
    classes,
    styles,
    className,
    mapProps,
    tileLayerProps,
    ...other
  } = props

  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('md'))
  const [isFullScreen, setIsFullScreen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()

  const toggleFullScreen = useCallback(() => {
    if (isFullScreen) {
      document.exitFullscreen()
    } else {
      containerRef.current?.requestFullscreen()
    }
  }, [isFullScreen])

  const onFullScreenChange = useCallback(() => {
    setIsFullScreen(document.fullscreenElement === containerRef.current)
  }, [])

  useEffect(() => {
    document.addEventListener('fullscreenchange', onFullScreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', onFullScreenChange)
    }
  }, [onFullScreenChange])

  const [map, setMap] = useState<LeafletMap | undefined>()

  useEffect(() => {
    if (map) {
      if (isSm && !isFullScreen) {
        map.dragging.disable()
      } else {
        map.dragging.enable()
      }
    }
  }, [isSm, isFullScreen, map])

  const plugins = useMemo(
    () =>
      additionalPlugins?.map((plugin) => {
        const { element, ...otherPluginProps } = plugin
        const PluginElement = element
        return (
          <PluginElement
            {...otherPluginProps}
            isMobile={isSm}
            readOnly={readOnly}
            isFullScreen={isFullScreen}
            map={map}
          />
        )
      }),
    [additionalPlugins, readOnly, isSm, isFullScreen, map]
  )

  return (
    <Stack {...other}>
      <Suspense fallback={<div>Loading map...</div>}>
        <LazyLeafletMap
          {...mapProps}
          //@ts-ignore
          ref={setMap}
          center={center ?? defaultPosition.center}
          zoom={zoom}
          scrollWheelZoom={true}
          className={cx('AruiMap-map', classes?.map)}
          style={{
            height: '100%',
            minHeight: 400,
            width: '100%',
            zIndex: 0,
            ...styles?.map
          }}
        >
          <DraggableMarker {...draggableMarkerPlugin} map={map} />
          {plugins}
        </LazyLeafletMap>
      </Suspense>
      {children}
      {isSm && !isFullScreen && (
        <Button
          className={cx(
            'AruiMap-openFullScreenButton',
            classes?.openFullScreenButton
          )}
          style={styles?.openFullScreenButton}
          onClick={toggleFullScreen}
        >
          {t('g2.openFullScreen')}
        </Button>
      )}
      {isFullScreen && (
        <IconButton
          className={cx(
            'AruiMap-closeFullScreenIcon',
            classes?.closeFullScreenIcon
          )}
          style={styles?.closeFullScreenIcon}
          onClick={toggleFullScreen}
        >
          <CloseRounded />
        </IconButton>
      )}
      {!!errorMessage && (
        <FormHelperText
          className={cx('AruiMap-errorMessage', classes?.errorMessage)}
          style={styles?.errorMessage}
        >
          {errorMessage}
        </FormHelperText>
      )}
    </Stack>
  )
}
