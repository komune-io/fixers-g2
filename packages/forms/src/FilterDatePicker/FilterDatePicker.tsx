import {
  MobileDatePicker as MuiMobileDatePicker,
  DatePickerProps as MuiDatePickerProps,
  LocalizationProvider,
  DateView
} from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import React, { forwardRef, useCallback, useMemo, useState } from 'react'
import { useFilterColorStyle, useFilterInputStyles } from '../style'
import {
  BasicProps,
  makeG2STyles,
  MergeMuiElementProps
} from '@komune-io/g2-themes'
import {
  InputAdornment,
  InputLabelProps,
  StandardTextFieldProps
} from '@mui/material'
import { Calendar } from '../assets/icons'
import { ClearRounded } from '@mui/icons-material'
import { fr, enUS } from 'date-fns/locale'
import { CustomActionBar } from '../DatePicker/CustomActionBar'
import { useTranslation } from 'react-i18next'
const dateFnsLocales = {
  fr,
  enUS
}

const useStyles = makeG2STyles()({
  root: {
    position: 'relative',
    width: 'fit-content'
  },
  input: {
    width: '100%',
    '& .MuiInputBase-root': {
      minWidth: '120px',
      paddingRight: '12px'
    }
  },
  inputWithRemove: {
    width: '100%',
    '& .MuiInputBase-root': {
      minWidth: '150px',
      paddingRight: `12px`
    },
    '& .MuiInputBase-input': {
      paddingRight: `20px`
    }
  },
  calendarIcon: {
    width: '17px',
    height: '17px',
    cursor: 'pointer',
    color: 'currentColor',
    stroke: 'currentColor',
    fill: 'none'
  },
  calendarIconDisabled: {
    cursor: 'default'
  },
  clear: {
    right: '30px'
  }
})

export interface FilterDatePickerClasses {
  input?: string
  textField?: string
  label?: string
  calendarIcon?: string
  clearIcon?: string
}

export interface FilterDatePickerStyles {
  input?: React.CSSProperties
  textField?: React.CSSProperties
  label?: React.CSSProperties
  calendarIcon?: React.CSSProperties
  clearIcon?: React.CSSProperties
}

export interface FilterDatePickerBasicProps extends BasicProps {
  /**
   * The label of the input
   */
  label?: string
  /**
   * The Date entered in the input
   */
  value?: Date
  /**
   * The event called when the value of the input changed
   */
  onChangeDate?: (date?: Date) => void
  /**
   * The event called when the value of the input is removed
   */
  onRemove?: () => void
  /**
   * The min Date that the user can choose
   */
  minDate?: Date
  /**
   * The max Date that the user can choose
   */
  maxDate?: Date
  /**
   * If true, the checkbox will be disabled
   *
   * @default false
   */
  disabled?: boolean

  /**
   * The color of the input
   *
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'default'

  /**
   * The variant of the input
   *
   * @default 'filled'
   */
  variant?: 'filled' | 'outlined'
  /**
   * The props to the textfield element
   *
   */
  textFieldProps?: Partial<StandardTextFieldProps>
  /**
   * The porps given to the label component
   */
  InputLabelProps?: Partial<InputLabelProps>
  /**
   * The name passed tothe input
   *
   */
  name?: string
  /**
   * The classes applied to the different part of the component
   */
  classes?: FilterDatePickerClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: FilterDatePickerStyles
}

export type FilterDatePickerProps = MergeMuiElementProps<
  Omit<MuiDatePickerProps<Date>, 'onChange' | 'renderInput'>,
  FilterDatePickerBasicProps
>

const FilterDatePickerBase = (
  props: FilterDatePickerProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const {
    value,
    onChangeDate,
    onRemove,
    className,
    style,
    id,
    minDate,
    maxDate,
    disabled = false,
    label = '',
    color = 'primary',
    variant = 'filled',
    textFieldProps,
    name,
    classes,
    styles,
    InputLabelProps,
    onClose,
    onOpen,
    ...other
  } = props
  const defaultStyles = useFilterInputStyles()
  const localStyles = useStyles()
  const [open, setOpen] = useState(false)
  const { i18n } = useTranslation()

  const colorStyle = useFilterColorStyle({
    color,
    variant
  })

  const onOpenMemoized = useCallback(() => {
    setOpen(true)
    onOpen && onOpen()
  }, [onOpen])

  const onCloseMemoized = useCallback(() => {
    setOpen(false)
    onClose && onClose()
  }, [onClose])

  const format = useMemo(() => {
    if (i18n.language === 'fr')
      return {
        format: 'dd/MM/yyyy',
        views: ['day', 'month', 'year'] as DateView[]
      }
    return {
      format: 'yyyy/MM/dd',
      views: ['year', 'month', 'day'] as DateView[]
    }
  }, [i18n.language])

  const onChange = useCallback(
    (date: Date | null) => {
      onChangeDate && onChangeDate(date ? new Date(date) : undefined)
    },
    [onChangeDate]
  )

  const getVariantColorClass = useCallback(() => {
    if (variant === 'outlined') {
      switch (color) {
        case 'primary':
          return defaultStyles.classes.inputOutlinedPrimaryColor
        case 'secondary':
          return defaultStyles.classes.inputOutlinedSecondaryColor
        case 'default':
          return defaultStyles.classes.inputOutlinedGreyColor
      }
    }
    switch (color) {
      case 'primary':
        return defaultStyles.classes.inputFilledPrimaryColor
      case 'secondary':
        return defaultStyles.classes.inputFilledSecondaryColor
      case 'default':
        return defaultStyles.classes.inputFilledGreyColor
      default:
        return defaultStyles.classes.inputFilledGreyColor
    }
  }, [variant, color])

  const rightIcon = useMemo(() => {
    if (!value) return undefined
    if (onRemove && !disabled)
      return (
        <ClearRounded
          onClick={onRemove}
          className={defaultStyles.cx(
            defaultStyles.classes.clear,
            localStyles.classes.clear,
            'AruiFilterDatePicker-clearIcon',
            classes?.clearIcon
          )}
          style={styles?.clearIcon}
        />
      )
    return undefined
  }, [
    value,
    onRemove,
    defaultStyles.classes.clear,
    disabled,
    localStyles.classes.clear,
    classes?.clearIcon,
    styles?.clearIcon
  ])

  const InputProps = {
    endAdornment: (
      <InputAdornment
        style={variant === 'filled' ? colorStyle : undefined}
        component='div'
        position='end'
      >
        <Calendar
          onClick={!disabled ? onOpenMemoized : undefined}
          className={defaultStyles.cx(
            localStyles.classes.calendarIcon,
            disabled && localStyles.classes.calendarIconDisabled,
            'AruiFilterDatePicker-calendarIcon',
            classes?.calendarIcon
          )}
          style={styles?.calendarIcon}
        />
      </InputAdornment>
    ),
    onClick: onOpenMemoized,
    style:
      variant === 'filled'
        ? { ...styles?.input, ...colorStyle }
        : styles?.input,
    className: defaultStyles.cx('AruiDatePicker-input', classes?.input),
    ...textFieldProps?.InputProps
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={dateFnsLocales[i18n.language === 'en' ? 'enUS' : 'fr']}
    >
      <div
        className={defaultStyles.cx(
          localStyles.classes.root,
          'AruiFilterDatePicker-root',
          className
        )}
        style={variant === 'filled' ? { ...style, ...colorStyle } : style}
      >
        <MuiMobileDatePicker
          ref={ref}
          label={variant === 'outlined' ? label : undefined}
          open={open}
          onOpen={onOpen}
          onClose={onCloseMemoized}
          format={format.format}
          views={format.views}
          minDate={minDate}
          maxDate={maxDate}
          slotProps={{
            actionBar: {
              actions: ['cancel', 'clear', 'accept']
            },
            textField: {
              ...textFieldProps,
              id,
              name,
              disabled,
              placeholder: variant === 'filled' ? label : undefined,
              color: color !== 'default' ? color : undefined,
              className: defaultStyles.cx(
                defaultStyles.classes.input,
                variant !== 'outlined' &&
                  defaultStyles.classes.inputWithoutLabel,
                rightIcon
                  ? localStyles.classes.inputWithRemove
                  : localStyles.classes.input,
                getVariantColorClass(),
                'AruiFilterDatePicker-datePicker',
                classes?.textField
              ),
              style: styles?.textField,
              variant: 'outlined',
              InputProps: InputProps,
              InputLabelProps: {
                ...InputLabelProps,
                className: defaultStyles.cx(
                  defaultStyles.classes.label,
                  'AruiFilterDatePicker-label',
                  classes?.label
                ),
                style: styles?.label
              }
            }
          }}
          slots={{
            actionBar: CustomActionBar
          }}
          disabled={disabled}
          value={value ? value : null}
          onChange={onChange}
          {...other}
        />
        {rightIcon}
      </div>
    </LocalizationProvider>
  )
}
export const FilterDatePicker = forwardRef(
  FilterDatePickerBase
) as typeof FilterDatePickerBase
