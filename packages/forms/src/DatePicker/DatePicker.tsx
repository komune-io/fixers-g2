import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
  LocalizationProvider,
  DateView
} from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  useCallback,
  useMemo
} from 'react'
import { useInputStyles } from '../style'
import { FilledTextFieldProps as MuiTextFieldProps } from '@mui/material'
import {
  BasicProps,
  makeG2STyles,
  MergeMuiElementProps
} from '@komune-io/g2-themes'
import { fr, enUS } from 'date-fns/locale'
import { CustomActionBar } from './CustomActionBar'
import { useTranslation } from 'react-i18next'

const dateFnsLocales = {
  fr,
  enUS
}

const useStyles = makeG2STyles()((theme) => ({
  input: {
    width: '100%'
  },
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
  input?: CSSProperties
  helperText?: CSSProperties
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
   * @default 'dd/MM/yyyy' or 'yyyy/MM/dd'
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
   * The helper message below the field
   */
  helperText?: string
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
  Omit<MuiDatePickerProps<Date>, 'onChange' | 'renderInput'>,
  DatePickerBasicProps
>

const DatePickerBase = (
  props: DatePickerProps,
  ref: ForwardedRef<HTMLDivElement>
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
    placeholder,
    size = 'medium',
    onRemove,
    textFieldProps,
    name,
    error,
    errorMessage,
    helperText,
    classes,
    styles,
    ...other
  } = props

  const defaultStyles = useInputStyles()
  const localStyles = useStyles()
  const { i18n } = useTranslation()
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

  const placeHolderInited = placeholder ?? format.format

  const onChange = useCallback(
    (date: Date | null) => {
      onChangeDate && onChangeDate(date ? new Date(date) : undefined)
    },
    [onChangeDate]
  )

  const formHelperProps = useMemo(() => {
    return {
      className: defaultStyles.cx(
        errorMessage !== '' && error
          ? defaultStyles.classes.errorHelperText
          : defaultStyles.classes.helperText,
        'AruiTextfield-helperText',
        classes?.helperText
      ),
      style: styles?.helperText
    }
  }, [classes?.helperText, styles?.helperText, errorMessage, error])

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={dateFnsLocales[i18n.language === 'en' ? 'enUS' : 'fr']}
    >
      <MuiDatePicker
        ref={ref}
        format={format.format}
        views={format.views}
        minDate={minDate}
        maxDate={maxDate}
        orientation='portrait'
        slotProps={{
          actionBar: {
            actions: ['cancel', 'clear']
          },
          dialog: {
            className: localStyles.classes.dialog
          },
          textField: {
            name,
            variant: 'filled',
            error,
            className: defaultStyles.cx(
              localStyles.classes.input,
              defaultStyles.classes.input,
              size === 'large' && defaultStyles.classes.inputLarge,
              size === 'medium' && defaultStyles.classes.inputMedium,
              size === 'small' && defaultStyles.classes.inputSmall,
              error && defaultStyles.classes.inputError,
              disabled && defaultStyles.classes.inputDisabled,
              'AruiDatePicker-datePicker',
              className
            ),
            style,
            helperText: error ? errorMessage ?? helperText : helperText,
            color: 'primary',
            InputProps: {
              disableUnderline: true,
              style: styles?.input,
              className: defaultStyles.cx(
                'AruiDatePicker-input',
                classes?.input
              ),
              ...textFieldProps?.InputProps
            },
            FormHelperTextProps: formHelperProps,
            placeholder: placeHolderInited
          }
        }}
        slots={{
          actionBar: CustomActionBar
        }}
        disabled={disabled}
        value={value || null}
        onChange={onChange}
        {...other}
      />
    </LocalizationProvider>
  )
}

export const DatePicker = forwardRef(DatePickerBase) as typeof DatePickerBase
