import React from 'react'
import {
  MapContainer,
  MapContainerProps,
  TileLayer,
  TileLayerProps
} from 'react-leaflet'

export interface LeafletMapProps extends Partial<MapContainerProps> {
  children?: React.ReactNode
  tileLayerProps?: Partial<TileLayerProps>
}

const LeafletMap = React.forwardRef((props: LeafletMapProps, ref: any) => {
  const { children, tileLayerProps, ...other } = props
  return (
    <MapContainer ref={ref} {...other}>
      <TileLayer
        {...tileLayerProps}
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {children}
    </MapContainer>
  )
})

export default LeafletMap
