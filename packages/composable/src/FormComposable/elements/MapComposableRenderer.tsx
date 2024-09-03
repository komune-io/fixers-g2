import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getIn } from 'formik'
import React, { useMemo, useCallback } from 'react'
import {
  DraggableMarkerNeeds,
  Map,
  MapProps,
  MapPlugin
} from '@komune-io/g2-forms'

export type MapPropsWithLimitedPlugins = Omit<
  MapProps,
  'draggableMarkerPlugin' | 'additionalPlugins'
> & {
  draggableMarkerPlugin?: Omit<
    DraggableMarkerNeeds,
    'onPositionChange' | 'position'
  > & { enable?: boolean }
  additionalPlugins?: Omit<MapPlugin, 'value' | 'setValue'>[]
}

export type MapComposableRendererProps = FieldRenderProps<
  'map',
  MapPropsWithLimitedPlugins
>
export const MapComposableRenderer: ElementRendererFunction<
  MapComposableRendererProps
> = (props: MapComposableRendererProps) => {
  const { element, formState, basicProps } = props
  const { params } = element
  const mapState = useMemo(
    () => getIn(formState.values, basicProps.name),
    [formState.values, basicProps.name]
  )

  const {
    onChange,
    onValueChange,
    emptyValueInReadOnly,
    error,
    isLoading,
    ...componentProps
  } = basicProps

  const pluginsCount =
    (params?.additionalPlugins?.length ?? 0) +
    (params?.draggableMarkerPlugin?.enable ? 1 : 0)

  const onChangeMapState = useCallback(
    (key: string, value: any) => {
      if (onValueChange) {
        onValueChange(value, formState)
      } else {
        formState.setFieldValue(
          componentProps.name,
          pluginsCount > 1 ? { ...mapState, [key]: value } : value
        )
        onChange && onChange(value)
      }
    },
    [mapState, formState.setFieldValue, pluginsCount]
  )

  const additionalPlugins = useMemo(
    () =>
      params?.additionalPlugins?.map(
        (plugin): MapPlugin => ({
          ...plugin,
          value: mapState
            ? pluginsCount > 1
              ? mapState[plugin.key]
              : mapState
            : undefined,
          setValue: (value) => onChangeMapState(plugin.key, value)
        })
      ),
    [params?.additionalPlugins, mapState, onChangeMapState, pluginsCount]
  )

  return (
    <Map
      {...componentProps}
      {...params}
      additionalPlugins={additionalPlugins}
      draggableMarkerPlugin={
        params?.draggableMarkerPlugin?.enable
          ? {
              onPositionChange: (position, geojson) =>
                onChangeMapState('marker', {
                  position: position,
                  geojson: geojson
                }),
              position:
                pluginsCount > 1
                  ? mapState?.marker?.position
                  : mapState?.position,
              ...params?.draggableMarkerPlugin
            }
          : undefined
      }
    />
  )
}
