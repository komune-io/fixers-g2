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
import { AutoComplete, AutoCompleteProps } from '../AutoComplete'
import { LoadingRenderer } from './LoadingRenderer'
import { ReadonlyRenderer } from './ReadonlyRenderer'

interface InputLabeledClasses {
  label?: string
  input?: string
}

interface InputLabeledStyles {
  label?: React.CSSProperties
  input?: React.CSSProperties
}

export type InputLabeledTypes =
  | 'select'
  | 'textField'
  | 'datePicker'
  | 'radioChoices'
  | 'autoComplete'

export interface InputLabeledBasicProps<
  T extends InputLabeledTypes = 'textField'
> extends BasicProps {
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
   * The input will be replaced by the solution choosed on readonly.
   * If you choose the "text it will be displayed in a Typography.
   * If you choose "chip" it will be displayed in chips.
   * @default "text"
   */
  readonlyType?: 'text' | 'chip'
  /**
   * This function is used to attribute a chip color to the value to be displayed (if not provided the default color will be used)
   */
  getReadonlyChipColor?: (value: string | number) => string | undefined
  /**
   * attribute a link to a readonly text
   */
  readonlyTextUrl?: string
  /**
   * If you want to add additionnals element near to the input use this prop
   */
  createInputContainer?: (input: JSX.Element) => JSX.Element
  /**
   * Indicates if the data is currently loading
   *
   * @default false
   */
  isLoading?: boolean
  /**
   * The classes applied to the different part of the component
   */
  classes?: InputLabeledClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: InputLabeledStyles
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

type RemoveMainProps<T> = Omit<T, keyof InputLabeledBasicProps>

type InputLabeledComponentProps<
  T extends InputLabeledTypes,
  R extends boolean
> = InputLabeledBasicProps<T> &
  ([R] extends [true]
    ? RemoveMainProps<TextFieldProps>
    : [T] extends ['select']
    ? RemoveMainProps<SelectProps>
    : [T] extends ['datePicker']
    ? RemoveMainProps<DatePickerProps>
    : [T] extends ['radioChoices']
    ? RemoveMainProps<RadioChoicesProps>
    : [T] extends ['autoComplete']
    ? RemoveMainProps<AutoCompleteProps>
    : RemoveMainProps<TextFieldProps>)

interface InputLabeledComponent {
  <T extends InputLabeledTypes, R extends boolean>(
    props: {
      inputType: T
      readonly?: R
    } & InputLabeledComponentProps<T, R>,
    ref: React.ForwardedRef<HTMLDivElement>
  ): JSX.Element
}

export type InputLabeledProps = InputLabeledBasicProps &
  Omit<TextFieldProps, keyof InputLabeledBasicProps> &
  Omit<SelectProps, keyof InputLabeledBasicProps> &
  Omit<DatePickerProps, keyof InputLabeledBasicProps> &
  Omit<AutoCompleteProps, keyof InputLabeledBasicProps> &
  Omit<RadioChoicesProps, keyof InputLabeledBasicProps> & {
    inputClasses?: SelectClasses | TextFieldClasses | DatePickerClasses
    inputStyles?: SelectStyles | TextFieldStyles | DatePickerStyles
    inputType: InputLabeledTypes
  }

//@ts-ignore
export const InputLabeled: InputLabeledComponent = React.forwardRef(
  (
    props: Partial<InputLabeledProps>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
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
      size = 'medium',
      isLoading = false,
      createInputContainer,
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
      return isLoading ? (
        <LoadingRenderer {...props} />
      ) : readonly ? (
        <ReadonlyRenderer {...props} />
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
      ) : inputType === 'autoComplete' ? (
        //@ts-ignore
        <AutoComplete
          {...other}
          className={classes?.input}
          style={styles?.input}
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

    const container = useMemo(
      () => (createInputContainer ? createInputContainer(inputUi) : undefined),
      [createInputContainer, inputUi]
    )

    if (
      readonly &&
      !props.value &&
      (!props.values || props.values.length === 0)
    )
      return <></>
    return (
      <Box className={className} style={style}>
        {labelUi}
        {container ?? inputUi}
      </Box>
    )
  }
)
