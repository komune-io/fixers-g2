import {
  MapContainer,
  MapContainerProps,
  TileLayer,
  TileLayerProps
} from 'react-leaflet'
import { markerIcon, markerIcon2x, markerShadow } from './leafletImages'
import 'leaflet/dist/leaflet.css'

import L from 'leaflet'
import { forwardRef, ReactNode } from 'react'

//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

export interface LeafletMapProps extends Partial<MapContainerProps> {
  children?: ReactNode
  tileLayerProps?: Partial<TileLayerProps>
}

const LeafletMap = forwardRef((props: LeafletMapProps, ref: any) => {
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
