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
import React, { useMemo } from 'react'
import { mergeRegister } from '@lexical/utils'
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  REDO_COMMAND,
  UNDO_COMMAND,
  $createParagraphNode,
  TextFormatType
} from 'lexical'
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text'
import { useTranslation } from 'react-i18next'

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

export const Toolbar = (props: { titlesTopLevel?: 'h1' | 'h4' }) => {
  const { titlesTopLevel } = props

  const [currentFormat] = useCellValues(currentFormat$)
  const applyFormat = usePublisher(applyFormat$)
  const [currentListType] = useCellValues(currentListType$)
  const applyListType = usePublisher(applyListType$)
  const convertSelectionToNode = usePublisher(convertSelectionToNode$)
  const currentBlockType = useCellValue(currentBlockType$)

  const { t } = useTranslation()

  const decorationsDisplay = useMemo(
    () =>
      [
        {
          value: 'bold',
          isOn: (currentFormat & IS_BOLD) !== 0,
          icon: <FormatBoldRounded />
        },
        {
          value: 'italic',
          isOn: (currentFormat & IS_ITALIC) !== 0,
          icon: <FormatItalicRounded />
        },
        {
          value: 'underline',
          isOn: (currentFormat & IS_UNDERLINE) !== 0,
          icon: <FormatUnderlinedRounded />
        }
      ].map((deco) => {
        return (
          <TglButton
            key={deco.value}
            value={deco.value}
            aria-label={deco.value}
            selected={deco.isOn}
            onChange={applyFormat.bind(null, deco.value as TextFormatType)}
          >
            {deco.icon}
          </TglButton>
        )
      }),
    [currentFormat, applyFormat.bind]
  )

  const titlesLogic = useMemo(
    () =>
      titlesTopLevel === 'h1'
        ? [
            {
              value: 'h1',
              selected: currentBlockType === 'h1'
            },
            {
              value: 'h2',
              selected: currentBlockType === 'h2'
            },
            {
              value: 'h3',
              selected: ['h3', 'h4', 'h5', 'h6'].includes(currentBlockType)
            }
          ]
        : [
            {
              value: 'h4',
              selected: ['h1', 'h2', 'h3', 'h4'].includes(currentBlockType)
            },
            {
              value: 'h5',
              selected: currentBlockType === 'h5'
            },
            {
              value: 'h6',
              selected: currentBlockType === 'h6'
            }
          ],
    [titlesTopLevel, currentBlockType]
  )

  const titlesDisplay = useMemo(
    () =>
      titlesLogic.map((logic, index) => {
        const count = index + 1
        const label = t('g2.title') + ' ' + count
        return (
          <TglButton
            key={count}
            value={logic.value}
            aria-label={label}
            selected={logic.selected}
            onChange={(_, value) =>
              convertSelectionToNode(() => $createHeadingNode(value))
            }
          >
            <Typography sx={{ color: 'currentColor' }} variant='body2'>
              {label}
            </Typography>
          </TglButton>
        )
      }),
    [titlesLogic, t, convertSelectionToNode]
  )

  return (
    <Stack direction='row' gap={0} width='100%' alignItems='center'>
      <Stack direction='row' gap={0} width='100%' flexWrap='wrap'>
        {decorationsDisplay}
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
            {t('g2.text')}
          </Typography>
        </TglButton>
        {titlesDisplay}
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
