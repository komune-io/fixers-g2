import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Table } from '@tanstack/react-table'
import React, { useCallback } from 'react'

export interface DndContainerProps {
  children?: React.ReactNode
  onDragRow?: (oldRowId: string | number, newRowId: string | number) => void
  tableState: Table<any>
}

export const DndContainer = (props: DndContainerProps) => {
  const { children, onDragRow, tableState } = props

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (active && over && active.id !== over.id && onDragRow) {
        onDragRow(active.id, over.id)
      }
    },
    [onDragRow]
  )

  const allRowIds = tableState
    .getRowModel()
    .rows.map((row) => tableState._getRowId(row.original, row.index))

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext items={allRowIds} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
