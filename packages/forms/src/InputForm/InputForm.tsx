import { Box, InputLabel } from '@mui/material'
import React, { useMemo } from 'react'
import { Select, SelectProps, SelectClasses, SelectStyles } from '../Select'
import {
  TextField,
  TextFieldProps,
  TextFieldClasses,
  TextFieldStyles
} from '../TextField'
import {
  DatePicker,
  DatePickerClasses,
  DatePickerStyles,
  DatePickerProps
} from '../DatePicker'
import { useInputStyles } from '../style'
import { BasicProps } from '@smartb/g2-themes'
import {
  RadioChoicesClasses,
  RadioChoicesProps,
  RadioChoicesStyles,
  RadioChoices
} from '../RadioChoices'

interface InputFormClasses {
  label?: string
  input?: string
}

interface InputFormStyles {
  label?: React.CSSProperties
  input?: React.CSSProperties
}

export type InputFormTypes =
  | 'select'
  | 'textField'
  | 'datePicker'
  | 'radioChoices'

export interface InputFormBasicProps<T extends InputFormTypes = 'textField'>
  extends BasicProps {
  /**
   * The label of the input
   */
  label?: string
  /**
   * If true the input will be disabled and forced on type 'textfield'
   * @default false
   */
  readonly?: boolean
  /**
   * The classes applied to the different part of the component
   */
  classes?: InputFormClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: InputFormStyles
  /**
   * The classes applied to the different part of the input
   *
   * The type will be equal to the classes type of the input selected:
   * **See the reference below** ⬇️
   */
  inputClasses?: [T] extends ['textField']
    ? TextFieldClasses
    : [T] extends ['select']
    ? SelectClasses
    : [T] extends ['datePicker']
    ? DatePickerClasses
    : RadioChoicesClasses
  /**
   * The styles applied to the different part of the input
   *
   * The type will be equal to the classes type of the input selected:
   * **See the reference below** ⬇️
   */
  inputStyles?: [T] extends ['textField']
    ? TextFieldStyles
    : [T] extends ['select']
    ? SelectStyles
    : [T] extends ['datePicker']
    ? DatePickerStyles
    : RadioChoicesStyles
}

type RemoveMainProps<T> = Omit<T, keyof InputFormBasicProps>

type InputFormComponentProps<
  T extends InputFormTypes,
  R extends Boolean = false
> = InputFormBasicProps<T> &
  ([R] extends [true]
    ? RemoveMainProps<TextFieldProps>
    : [T] extends ['select']
    ? RemoveMainProps<SelectProps>
    : [T] extends ['datePicker']
    ? RemoveMainProps<DatePickerProps>
    : [T] extends ['radioChoices']
    ? RemoveMainProps<RadioChoicesProps>
    : RemoveMainProps<TextFieldProps>)

interface InputFormComponent {
  <T extends InputFormTypes, R extends Boolean = false>(
    props: {
      inputType: T
      readonly?: R
    } & InputFormComponentProps<T, R>,
    ref: React.ForwardedRef<HTMLDivElement>
  ): JSX.Element
}

export type InputFormProps = InputFormBasicProps &
  Omit<TextFieldProps, keyof InputFormBasicProps> &
  Omit<SelectProps, keyof InputFormBasicProps> &
  Omit<DatePickerProps, keyof InputFormBasicProps> &
  Omit<RadioChoicesProps, keyof InputFormBasicProps> & {
    inputClasses?: SelectClasses | TextFieldClasses | DatePickerClasses
    inputStyles?: SelectStyles | TextFieldStyles | DatePickerStyles
    inputType: InputFormTypes
  }

//@ts-ignore
export const InputForm: InputFormComponent = React.forwardRef(
  (props: Partial<InputFormProps>, ref: React.ForwardedRef<HTMLDivElement>) => {
    const {
      inputType = 'textField',
      readonly = false,
      className,
      style,
      label,
      id,
      classes,
      styles,
      inputClasses,
      inputStyles,
      size,
      ...other
    } = props

    const defaultStyles = useInputStyles()

    const labelUi = useMemo(() => {
      return label ? (
        <InputLabel
          htmlFor={id}
          className={defaultStyles.cx(
            defaultStyles.classes.label,
            size === 'small' && defaultStyles.classes.labelSmall,
            classes?.label
          )}
          style={styles?.label}
        >
          {label}
        </InputLabel>
      ) : null
    }, [label, classes?.label, id, styles?.label, size])

    const inputUi = useMemo(() => {
      return readonly ? (
        <TextField
          {...other}
          size={size}
          className={classes?.input}
          style={styles?.input}
          classes={inputClasses}
          styles={inputStyles}
          ref={ref}
          id={id}
          disabled={true}
        />
      ) : inputType === 'textField' ? (
        <TextField
          {...other}
          size={size}
          className={classes?.input}
          style={styles?.input}
          classes={inputClasses}
          styles={inputStyles}
          ref={ref}
          id={id}
        />
      ) : inputType === 'select' ? (
        <Select
          {...other}
          size={size}
          className={classes?.input}
          style={styles?.input}
          classes={inputClasses}
          styles={inputStyles}
          ref={ref}
          id={id}
        />
      ) : inputType === 'radioChoices' ? (
        <RadioChoices
          {...other}
          className={classes?.input}
          style={styles?.input}
          classes={inputClasses}
          styles={inputStyles}
          ref={ref}
          id={id}
        />
      ) : (
        <DatePicker
          {...other}
          size={size}
          className={classes?.input}
          style={styles?.input}
          classes={inputClasses}
          styles={inputStyles}
          //@ts-ignore
          ref={ref}
          id={id}
        />
      )
    }, [
      readonly,
      inputType,
      classes?.input,
      id,
      styles?.input,
      ref,
      size,
      Object.values({ ...other })
    ])

    return (
      <Box className={className} style={style}>
        {labelUi}
        {inputUi}
      </Box>
    )
  }
)
