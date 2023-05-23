import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
  LocalizationProvider
} from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import React, { forwardRef, useCallback, useMemo } from 'react'
import { useInputStyles } from '../style'
import {
  TextField as MuiTextField,
  FilledTextFieldProps as MuiTextFieldProps
} from '@mui/material'
import {
  BasicProps,
  makeG2STyles,
  MergeMuiElementProps
} from '@smartb/g2-themes'
import { fr, enUS } from 'date-fns/locale'
import { CustomActionBar } from './CustomActionBar'
import { useTranslation } from 'react-i18next'
const dateFnsLocales = {
  fr,
  enUS
}

const useStyles = makeG2STyles()((theme) => ({
  dialog: {
    '& .MuiButton-root': {
      background: theme.colors.primary,
      padding: '3px 5px',
      textTransform: 'lowercase'
    }
  }
}))

export interface DatePickerClasses {
  input?: string
  helperText?: string
}

export interface DatePickerStyles {
  input?: React.CSSProperties
  helperText?: React.CSSProperties
}

export interface DatePickerBasicProps extends BasicProps {
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
   * Placeholder Message.
   *
   * @default 'jj/MM/yyyy'
   */
  placeholder?: string
  /**
   * Define if the value of the input is valid or not
   *
   * @default false
   */
  error?: boolean

  /**
   * The message displayed when the input value is wrong
   */
  errorMessage?: string
  /**
   * The size of the input
   *
   * @default 'medium'
   */
  size?: 'large' | 'medium' | 'small'
  /**
   * The props to the textfield element
   *
   */
  textFieldProps?: Partial<MuiTextFieldProps>
  /**
   * The name passed tothe input
   *
   */
  name?: string
  /**
   * The classes applied to the different part of the component
   */
  classes?: DatePickerClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: DatePickerStyles
}

export type DatePickerProps = MergeMuiElementProps<
  Omit<MuiDatePickerProps<Date, Date>, 'onChange' | 'renderInput'>,
  DatePickerBasicProps
>

const DatePickerBase = (
  props: DatePickerProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const {
    value,
    onChangeDate,
    className,
    style,
    id,
    minDate,
    maxDate,
    disabled = false,
    placeholder = 'jj/MM/yyyy',
    size = 'medium',
    onRemove,
    textFieldProps,
    name,
    error,
    errorMessage,
    classes,
    styles,
    ...other
  } = props

  const defaultStyles = useInputStyles()
  const localStyles = useStyles()
  const { i18n } = useTranslation()
  const format = useMemo(() => {
    if (i18n.language === 'fr')
      return { format: 'dd/MM/yyyy', mask: '__/__/____' }
    return { format: 'yyyy/MM/dd', mask: '____/__/__' }
  }, [i18n.language])

  const onChange = useCallback(
    (date: Date | null) => {
      onChangeDate && onChangeDate(date ? new Date(date) : undefined)
    },
    [onChangeDate]
  )

  const formHelperProps = useMemo(() => {
    return {
      className: defaultStyles.cx(
        defaultStyles.classes.helperText,
        'AruiTextfield-helperText',
        classes?.helperText
      ),
      style: styles?.helperText
    }
  }, [classes?.helperText, styles?.helperText])

  const renderInput = useCallback(
    (props) => {
      if (placeholder) {
        delete props.inputProps?.placeholder
      }
      return (
        <MuiTextField
          {...textFieldProps}
          {...props}
          id={id}
          name={name}
          variant='filled'
          error={error}
          className={defaultStyles.cx(
            defaultStyles.classes.input,
            size === 'large' && defaultStyles.classes.inputLarge,
            size === 'medium' && defaultStyles.classes.inputMedium,
            size === 'small' && defaultStyles.classes.inputSmall,
            error && defaultStyles.classes.inputError,
            disabled && defaultStyles.classes.inputDisabled,
            'AruiDatePicker-datePicker',
            className
          )}
          style={style}
          helperText={error ? errorMessage : ''}
          color='primary'
          InputProps={{
            disableUnderline: true,
            style: styles?.input,
            className: defaultStyles.cx('AruiDatePicker-input', classes?.input),
            ...textFieldProps?.InputProps,
            ...props.InputProps
          }}
          FormHelperTextProps={formHelperProps}
          placeholder={placeholder}
        />
      )
    },
    [
      id,
      name,
      error,
      errorMessage,
      style,
      className,
      classes?.input,
      styles?.input,
      textFieldProps,
      formHelperProps
    ]
  )
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={dateFnsLocales[i18n.language === 'en' ? 'enUS' : 'fr']}
    >
      <MuiDatePicker
        ref={ref}
        inputFormat={format.format}
        mask={format.mask}
        minDate={minDate}
        maxDate={maxDate}
        componentsProps={{
          actionBar: {
            actions: ['cancel', 'clear']
          }
        }}
        components={{
          ActionBar: CustomActionBar
        }}
        DialogProps={{ className: localStyles.classes.dialog }}
        disabled={disabled}
        value={value || null}
        onChange={onChange}
        renderInput={renderInput}
        {...other}
      />
    </LocalizationProvider>
  )
}

export const DatePicker = forwardRef(DatePickerBase) as typeof DatePickerBase
