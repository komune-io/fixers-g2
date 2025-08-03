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
import { ReactNode, useCallback } from 'react'

export interface DndContainerProps {
  children?: ReactNode
  onDragRow?: (oldRowId: string | number, newRowId: string | number) => void
  dataIds?: string[]
}

export const DndContainer = (props: DndContainerProps) => {
  const { children, onDragRow, dataIds } = props

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

  if (!dataIds) return <>{children}</>
  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
