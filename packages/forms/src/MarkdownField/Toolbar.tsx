import {
  activeEditor$,
  applyFormat$,
  applyListType$,
  convertSelectionToNode$,
  currentBlockType$,
  currentFormat$,
  currentListType$,
  useCellValue,
  useCellValues,
  usePublisher
} from '@mdxeditor/editor'
import {
  FormatBoldRounded,
  FormatItalicRounded,
  FormatListBulletedRounded,
  FormatListNumberedRounded,
  FormatQuoteRounded,
  FormatUnderlinedRounded,
  RedoRounded,
  UndoRounded
} from '@mui/icons-material'
import {
  Box,
  Divider,
  Stack,
  ToggleButton,
  Typography,
  styled,
  toggleButtonGroupClasses
} from '@mui/material'
import React from 'react'
import { mergeRegister } from '@lexical/utils'
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  REDO_COMMAND,
  UNDO_COMMAND,
  $createParagraphNode
} from 'lexical'
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text'

export const IS_BOLD = 0b1 as const
export const IS_ITALIC = 0b10 as const
export const IS_UNDERLINE = 0b1000 as const

const TglButton = styled(ToggleButton)({
  border: 0,
  color: '#BDBDBD',
  [`&.${toggleButtonGroupClasses.disabled}`]: {
    border: 0
  },
  '&.Mui-selected': {
    background: 'unset',
    color: '#616161'
  }
})

const HistoryActionButton = styled(ToggleButton)({
  border: 0,
  background: 'unset',
  color: '#616161',
  [`&.${toggleButtonGroupClasses.disabled}`]: {
    border: 0,
    color: '#BDBDBD'
  }
})

export const Toolbar = () => {
  const [currentFormat] = useCellValues(currentFormat$)
  const applyFormat = usePublisher(applyFormat$)
  const [currentListType] = useCellValues(currentListType$)
  const applyListType = usePublisher(applyListType$)
  const convertSelectionToNode = usePublisher(convertSelectionToNode$)
  const currentBlockType = useCellValue(currentBlockType$)

  const boldIsOn = (currentFormat & IS_BOLD) !== 0
  const italicIsOn = (currentFormat & IS_ITALIC) !== 0
  const underlineIsOn = (currentFormat & IS_UNDERLINE) !== 0

  return (
    <Stack direction='row' gap={0} width='100%' alignItems='center'>
      <Stack direction='row' gap={0} width='100%' flexWrap='wrap'>
        <TglButton
          value='bold'
          aria-label='bold'
          selected={boldIsOn}
          onChange={applyFormat.bind(null, 'bold')}
        >
          <FormatBoldRounded />
        </TglButton>
        <TglButton
          value='italic'
          aria-label='italic'
          selected={italicIsOn}
          onChange={applyFormat.bind(null, 'italic')}
        >
          <FormatItalicRounded />
        </TglButton>
        <TglButton
          value='underlined'
          aria-label='underlined'
          selected={underlineIsOn}
          onChange={applyFormat.bind(null, 'underline')}
        >
          <FormatUnderlinedRounded />
        </TglButton>
        <Divider orientation='vertical' flexItem variant='middle' />
        <TglButton
          value='bullet'
          aria-label='bullet list'
          selected={currentListType === 'bullet'}
          onChange={(_, value) => applyListType(value)}
        >
          <FormatListBulletedRounded />
        </TglButton>
        <TglButton
          value='number'
          aria-label='numbered list'
          selected={currentListType === 'number'}
          onChange={(_, value) => applyListType(value)}
        >
          <FormatListNumberedRounded />
        </TglButton>
        <Divider orientation='vertical' flexItem variant='middle' />
        <TglButton
          value='quote'
          aria-label='quote'
          selected={currentBlockType === 'quote'}
          onChange={() => convertSelectionToNode(() => $createQuoteNode())}
        >
          <FormatQuoteRounded />
        </TglButton>
        <TglButton
          value='paragraph'
          aria-label='paragraph'
          selected={currentBlockType === 'paragraph'}
          onChange={() => convertSelectionToNode(() => $createParagraphNode())}
        >
          <Typography sx={{ color: 'currentColor' }} variant='body2'>
            Text
          </Typography>
        </TglButton>
        <TglButton
          value='h4'
          aria-label='Title 1'
          selected={currentBlockType === 'h4'}
          onChange={(_, value) =>
            convertSelectionToNode(() => $createHeadingNode(value))
          }
        >
          <Typography sx={{ color: 'currentColor' }} variant='body2'>
            Title 1
          </Typography>
        </TglButton>
        <TglButton
          value='h5'
          aria-label='Title 2'
          selected={currentBlockType === 'h5'}
          onChange={(_, value) =>
            convertSelectionToNode(() => $createHeadingNode(value))
          }
        >
          <Typography sx={{ color: 'currentColor' }} variant='body2'>
            Title 2
          </Typography>
        </TglButton>
        <TglButton
          value='h6'
          aria-label='Title 3'
          selected={currentBlockType === 'h6'}
          onChange={(_, value) =>
            convertSelectionToNode(() => $createHeadingNode(value))
          }
        >
          <Typography sx={{ color: 'currentColor' }} variant='body2'>
            Title 3
          </Typography>
        </TglButton>
      </Stack>
      <Box sx={{ flexGrow: 1 }} />
      <UndoRedo />
    </Stack>
  )
}

export const UndoRedo: React.FC = () => {
  const [activeEditor] = useCellValues(activeEditor$)
  const [canUndo, setCanUndo] = React.useState(false)
  const [canRedo, setCanRedo] = React.useState(false)

  React.useEffect(() => {
    if (activeEditor) {
      return mergeRegister(
        activeEditor.registerCommand<boolean>(
          CAN_UNDO_COMMAND,
          (payload) => {
            setCanUndo(payload)
            return false
          },
          COMMAND_PRIORITY_CRITICAL
        ),
        activeEditor.registerCommand<boolean>(
          CAN_REDO_COMMAND,
          (payload) => {
            setCanRedo(payload)
            return false
          },
          COMMAND_PRIORITY_CRITICAL
        )
      )
    }
    return
  }, [activeEditor])

  return (
    <>
      <HistoryActionButton
        value='undo'
        aria-label='undo'
        disabled={!canUndo}
        selected={false}
        onChange={() => activeEditor?.dispatchCommand(UNDO_COMMAND, undefined)}
      >
        <UndoRounded />
      </HistoryActionButton>
      <HistoryActionButton
        value='redo'
        aria-label='redo'
        disabled={!canRedo}
        selected={false}
        onChange={() => activeEditor?.dispatchCommand(REDO_COMMAND, undefined)}
      >
        <RedoRounded />
      </HistoryActionButton>
    </>
  )
}
