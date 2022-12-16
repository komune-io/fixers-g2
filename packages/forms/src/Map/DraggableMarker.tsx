import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Marker } from 'react-leaflet'
import { LatLngLiteral, Marker as LeafletMarker, Map } from 'leaflet'
import { Button } from '@smartb/g2-components'
import GeoJSON, { Feature, Point } from 'geojson'

export interface DraggableMarkerNeeds {
  position?: LatLngLiteral
  onPositionChange?: (position: LatLngLiteral, geojson: Feature<Point>) => void
  addMarkerString?: string
  useMyPositionString?: string
  canDragString?: string
}

export interface DraggableMarkerProps extends DraggableMarkerNeeds {
  draggable?: boolean
}

export const DraggableMarker = (props: DraggableMarkerProps) => {
  const { draggable = false, onPositionChange, position, canDragString } = props
  const [diplayInfo, setDiplayInfo] = useState(draggable)
  const [markerRef, setmarkerRef] = useState<LeafletMarker<any> | null>(null)

  useEffect(() => {
    setDiplayInfo(draggable)
  }, [draggable])

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef
        if (marker != null) {
          onPositionChange &&
            onPositionChange(
              marker.getLatLng(),
              GeoJSON.parse(marker.getLatLng(), { Point: ['lat', 'lng'] })
            )
        }
      },
      dragstart() {
        setDiplayInfo(false)
      },
      click() {
        setDiplayInfo(false)
      }
    }),
    [onPositionChange, markerRef]
  )

  useEffect(() => {
    if (diplayInfo && !!markerRef) {
      markerRef
        .bindPopup(canDragString ?? 'Vous pouvez déplacer ce point')
        .openPopup()
    } else {
      markerRef?.closePopup()
      markerRef?.unbindPopup()
    }
  }, [diplayInfo, markerRef])

  if (!position) return <></>
  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={setmarkerRef}
    ></Marker>
  )
}

export const DraggableMarkerControl = (
  props: DraggableMarkerProps & {
    map?: Map
    isSm: boolean
    isFullScreen: boolean
  }
) => {
  const {
    onPositionChange,
    position,
    map,
    isSm,
    isFullScreen,
    addMarkerString,
    useMyPositionString
  } = props

  const onAddMarker = useCallback(() => {
    !!map &&
      onPositionChange &&
      onPositionChange(
        map.getCenter(),
        GeoJSON.parse(map.getCenter(), { Point: ['lat', 'lng'] })
      )
  }, [onPositionChange, map])

  const onUseMyLocation = useCallback(() => {
    !!map &&
      navigator.geolocation.getCurrentPosition(
        (event) => {
          const position = {
            lat: event.coords.latitude,
            lng: event.coords.longitude
          }
          if (onPositionChange) {
            onPositionChange(
              position,
              GeoJSON.parse(position, { Point: ['lat', 'lng'] })
            )
            map.flyTo(position, undefined, {
              duration: 3
            })
          }
        },
        undefined,
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      )
  }, [onPositionChange, map])

  if (!map) return <></>
  return (
    <>
      {(!isSm || isFullScreen) && !position && (
        <Button
          sx={{ position: 'absolute', bottom: '20px', right: '5px' }}
          onClick={onAddMarker}
        >
          {addMarkerString ?? 'Ajouter un marker'}
        </Button>
      )}
      {isSm && !isFullScreen && (
        <Button sx={{ marginTop: '24px' }} onClick={onUseMyLocation}>
          {useMyPositionString ?? 'Utiliser ma position'}
        </Button>
      )}
    </>
  )
}
