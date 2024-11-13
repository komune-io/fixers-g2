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

import { BasicProps, MergeMuiElementProps } from '@komune-io/g2-themes'
import { cx } from '@emotion/css'
import { useTranslation } from 'react-i18next'
import { MapContainerProps, TileLayerProps } from 'react-leaflet'
import { DraggableMarkerControl, DraggableMarkerNeeds } from './DraggableMarker'

const LazyLeafletMap = lazy(() => import('./LeafletMap'))
const LazyDraggableMarker = lazy(() => import('./DraggableMarker'))

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
  /**
   * the children wil be put under the map in the element tree you can pass absolute element that you want to apply above the map
   */
  children?: React.ReactNode
  /**
   * the pluggins you want to have inside the map they should be compatible with leaflet.
   * They should use the two required props `value` and `setValue` to handle their custom states
   * They will also receive the prop `map?: LeafletMap` of the type `import { Map as LeafletMap } from "leaflet"` to access the currentMap object and also the props `isMobile`, `readOnly`, `isFullScreen` to be informed of the state of the current map
   */
  additionalPlugins?: (MapPlugin & Record<string, any>)[]
  /**
   * the pluggin to have a draggableMarker on the map. When `readOnly` is set to `true` its just a simple marker
   */
  draggableMarkerPlugin?: DraggableMarkerNeeds
  /**
   * the initial center of the map
   */
  center?: LatLngExpression
  /**
   * the initial zoom of the map
   */
  zoom?: number
  /**
   * the props passed to the map component
   */
  mapProps?: Partial<MapContainerProps>
  /**
   * the props passed to the TileLayer component
   */
  tileLayerProps?: Partial<TileLayerProps>
  /**
   * the readOnly property passed to the pluggins of the map
   */
  readOnly?: boolean
  /**
   * the error message you want to display at the bottom of the map
   */
  errorMessage?: string
  /**
   * The classes applied to the different part of the component
   */
  classes?: MapClasses
  /**
   * The styles applied to the different part of the component
   */
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

  // This ref will hold the map container reference
  const mapContainerRef = useRef(null)
  const [map, setMap] = useState<LeafletMap | undefined>()

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

  useEffect(() => {
    // Set the map only once when component mounts
    if (!map && mapContainerRef.current) {
      setMap(mapContainerRef.current)
    }
  }, [map])

  useEffect(() => {
    if (map) {
      if (isSm && !isFullScreen) {
        map.dragging.disable()
      } else {
        map.dragging.enable()
      }
    }
  }, [isSm, isFullScreen, map, draggableMarkerPlugin])

  const plugins = useMemo(
    () =>
      additionalPlugins?.map((plugin, index) => {
        const { element, ...otherPluginProps } = plugin
        const PluginElement = element
        return (
          <PluginElement
            {...otherPluginProps}
            key={index}
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
    <Stack
      ref={containerRef}
      sx={{
        position: 'relative',
        zIndex: 0,
        transition: '0.6s',
        ...sx
      }}
      className={cx('AruiMap-root', className)}
      {...other}
    >
      <Suspense fallback={<div>Loading map...</div>}>
        <LazyLeafletMap
          {...mapProps}
          ref={mapContainerRef}
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
          {map && (
            <LazyDraggableMarker
              draggable={(!isSm || isFullScreen) && !readOnly}
              {...draggableMarkerPlugin}
              map={map}
            />
          )}
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
          sx={{ position: 'absolute', top: '10px', right: '5px' }}
          style={styles?.closeFullScreenIcon}
          onClick={toggleFullScreen}
        >
          <CloseRounded />
        </IconButton>
      )}
      {!!draggableMarkerPlugin && (
        <DraggableMarkerControl
          isFullScreen={isFullScreen}
          isSm={isSm}
          {...draggableMarkerPlugin}
          map={map}
          readOnly={readOnly}
        />
      )}
      {!!errorMessage && (
        <FormHelperText
          sx={{
            position: 'absolute',
            top: '100%',
            color: 'error.main',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.667,
            width: '100%',
            margin: '0',
            marginTop: '3px'
          }}
          className={cx('AruiMap-errorMessage', classes?.errorMessage)}
          style={styles?.errorMessage}
        >
          {errorMessage}
        </FormHelperText>
      )}
    </Stack>
  )
}
