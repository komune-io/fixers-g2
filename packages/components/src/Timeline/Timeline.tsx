import {
  Timeline as MuiTimeline,
  TimelineProps as MuiTimelineProps,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent
} from '@mui/lab'
import {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useMemo
} from 'react'
import { Typography } from '@mui/material'
import {
  MergeMuiElementProps,
  makeG2STyles,
  BasicProps,
  useTheme
} from '@komune-io/g2-themes'
import { FilledArrow } from '../icons'

const useStyles = makeG2STyles()((theme) => ({
  dot: {
    background: theme.colors.secondary,
    position: 'relative',
    alignSelf: 'unset',
    boxShadow: 'unset'
  },
  dotPassed: {
    background: theme.colors.tertiary,
    position: 'relative',
    alignSelf: 'unset',
    boxShadow: 'unset'
  },
  separator: {
    minWidth: '50px',
    maxWidth: '50px'
  },
  item: {
    transition: '0.3s'
  },
  selectableItem: {
    cursor: 'pointer',
    '&:hover .AruiTimeLine-selectorIndicator': {
      display: 'block'
    },
    '&:hover .AruiTimeLine-item': {
      opacity: '1'
    }
  },
  itemSelected: {
    opacity: '1',
    '& .AruiTimeLine-selectorIndicator': {
      display: 'block'
    }
  },
  connector: {
    background: theme.colors.tertiary
  },
  connectorProgress: {
    background: theme.colors.primary,
    width: '100%',
    height: '100%'
  },
  ItemDisabled: {
    opacity: '0.5'
  },
  timeContainer: {
    position: 'relative',
    flex: '0.2',
    display: 'flex',
    flexDirection: 'column'
  },
  timeContainerAlternate: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  flexSeparator: {
    flex: 1
  },
  selectorIndicator: {
    display: 'none',
    width: '25px',
    height: '25px',
    strokeWidth: '1.5',
    position: 'absolute',
    left: '-15px',
    top: '2px'
  },
  timelineAlternate: {
    '& .AruiTimeLine-item-ClickableContainer:nth-of-type(even) .AruiTimeLine-item':
      {
        flexDirection: 'row-reverse'
      },
    '& .AruiTimeLine-item-ClickableContainer:nth-of-type(even) .AruiTimeLine-timeContainer':
      {
        alignItems: 'end'
      }
  },
  timelineRight: {
    '& .AruiTimeLine-item': {
      flexDirection: 'row-reverse'
    }
  },
  activeDot: {
    border: `2px solid ${theme.colors.primary}`,
    position: 'absolute',
    width: 'calc(100% + 8px)',
    height: 'calc(100% + 8px)',
    marginLeft: '-10px',
    marginTop: '-10px',
    borderRadius: '50%',
    animation: '$flashing ease 2.5s infinite'
  },
  '@keyframes flashing': {
    '0%': {
      opacity: 0
    },
    '50%': {
      opacity: 1
    },
    '80%': {
      opacity: 1
    },
    '100%': {
      opacity: 0
    }
  }
}))

export interface TimeLineCell {
  id: string
  startTime: string
  endTime?: string
  startDate?: number
  endDate?: number
  content: ReactNode
  startDot?: ReactNode
  endDot?: ReactNode
  disabled?: boolean
}

interface TimelineClasses {
  item?: string
  content?: string
  timeContainer?: string
  startDot?: string
  endDot?: string
  connector?: string
  separator?: string
}

interface TimelineStyles {
  item?: CSSProperties
  content?: CSSProperties
  timeContainer?: CSSProperties
  startDot?: CSSProperties
  endDot?: CSSProperties
  connector?: CSSProperties
  separator?: CSSProperties
}

export interface TimelineBasicProps extends BasicProps {
  /**
   * The data that must be given to fill the timeline
   */
  lines: TimeLineCell[]
  /**
   * Indicates if the timeline takes place in the past
   *
   *  @default false
   */
  passedTimeLine?: boolean
  /**
   * The currently selected cell
   */
  selectedCellId?: string
  /**
   * The event triggered when a cell is selected. If this event is provided the lines are considered selectable
   */
  onSelectCell?: (cell: TimeLineCell) => void
  /**
   * The alignement of the timeline
   *
   *  @default "alternate"
   */
  align?: 'left' | 'right' | 'alternate'
  /**
   * The classes applied to the different part of the component
   */
  classes?: TimelineClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: TimelineStyles
}

export type TimelineProps = MergeMuiElementProps<
  MuiTimelineProps,
  TimelineBasicProps
>

/**
 * A timeline
 */
const TimelineBase = (
  props: TimelineProps,
  ref?: ForwardedRef<HTMLUListElement>
) => {
  const {
    lines,
    classes,
    styles,
    align = 'alternate',
    selectedCellId,
    onSelectCell,
    passedTimeLine = false,
    className,
    ...other
  } = props
  const theme = useTheme()
  const defaultStyles = useStyles()

  const linesUi = useMemo(
    () =>
      lines.map((line) => {
        let isPassed = false
        let isActive = false
        let timeLeft: number | undefined = undefined
        if (line.startDate) {
          if (line.startDate < Date.now()) isPassed = true
        }
        if (line.startDate && line.endDate) {
          if (line.startDate <= Date.now() && line.endDate >= Date.now()) {
            isActive = true
            isPassed = false
            timeLeft =
              ((Date.now() - line.startDate) * 100) /
              (line.endDate - line.startDate)
          }
        }
        const isSelected = !!selectedCellId && selectedCellId === line.id

        const handleKeyDown = (event) => {
          if (event.key === 'Enter' && onSelectCell && !line.disabled) {
            onSelectCell(line)
          }
        }

        return (
          <div
            key={line.id}
            onClick={() => onSelectCell && !line.disabled && onSelectCell(line)}
            onKeyDown={handleKeyDown}
            className={defaultStyles.cx(
              onSelectCell &&
                !line.disabled &&
                defaultStyles.classes.selectableItem,
              'AruiTimeLine-item-ClickableContainer'
            )}
          >
            <TimelineItem
              key={line.id}
              className={defaultStyles.cx(
                defaultStyles.classes.item,
                line.disabled && defaultStyles.classes.ItemDisabled,
                !!selectedCellId &&
                  selectedCellId !== line.id &&
                  defaultStyles.classes.ItemDisabled,
                isSelected && defaultStyles.classes.itemSelected,
                'AruiTimeLine-item',
                classes?.item
              )}
              style={styles?.item}
            >
              <FilledArrow
                color={theme.colors.primary}
                className={defaultStyles.cx(
                  defaultStyles.classes.selectorIndicator,
                  'AruiTimeLine-selectorIndicator'
                )}
              />
              <TimelineOppositeContent
                className={defaultStyles.cx(
                  align === 'alternate'
                    ? defaultStyles.classes.timeContainerAlternate
                    : defaultStyles.classes.timeContainer,
                  'AruiTimeLine-timeContainer',
                  classes?.timeContainer
                )}
                style={styles?.timeContainer}
              >
                <Typography variant='body2'>{line.startTime}</Typography>
                <div className={defaultStyles.classes.flexSeparator} />
                <Typography variant='body2'>{line.endTime}</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator
                className={defaultStyles.cx(
                  defaultStyles.classes.separator,
                  'AruiTimeLine-separator',
                  classes?.separator
                )}
                style={styles?.separator}
              >
                <TimelineDot
                  className={defaultStyles.cx(
                    isPassed && !passedTimeLine
                      ? defaultStyles.classes.dotPassed
                      : defaultStyles.classes.dot,
                    'AruiTimeLine-startDot',
                    classes?.startDot
                  )}
                  style={styles?.startDot}
                >
                  {line.startDot}
                  {isActive && !passedTimeLine && (
                    <div className={defaultStyles.classes.activeDot} />
                  )}
                </TimelineDot>
                <TimelineConnector
                  className={defaultStyles.cx(
                    defaultStyles.classes.connector,
                    'AruiTimeLine-connector',
                    classes?.connector
                  )}
                  style={styles?.connector}
                >
                  {timeLeft && !passedTimeLine && (
                    <div
                      className={defaultStyles.classes.connectorProgress}
                      style={{ height: `${timeLeft}%` }}
                    />
                  )}
                  {((!isPassed && !timeLeft) || passedTimeLine) && (
                    <div className={defaultStyles.classes.connectorProgress} />
                  )}
                </TimelineConnector>
                {line.endTime && (
                  <TimelineDot
                    className={defaultStyles.cx(
                      defaultStyles.classes.dotPassed,
                      'AruiTimeLine-endDot',
                      classes?.endDot
                    )}
                    style={styles?.endDot}
                  >
                    {line.endDot}
                  </TimelineDot>
                )}
              </TimelineSeparator>
              <TimelineContent
                className={defaultStyles.cx(
                  'AruiTimeLine-content',
                  classes?.content
                )}
                style={styles?.content}
              >
                {line.content}
              </TimelineContent>
            </TimelineItem>
          </div>
        )
      }),
    [
      lines,
      classes,
      styles,
      align,
      theme,
      selectedCellId,
      passedTimeLine,
      defaultStyles.classes
    ]
  )

  return (
    <MuiTimeline
      //@ts-ignore
      ref={ref}
      {...other}
      className={defaultStyles.cx(
        align === 'alternate' && defaultStyles.classes.timelineAlternate,
        align === 'right' && defaultStyles.classes.timelineRight,
        'AruiTimeLine-root',
        className
      )}
    >
      {linesUi}
    </MuiTimeline>
  )
}

export const Timeline = forwardRef(TimelineBase) as typeof TimelineBase
