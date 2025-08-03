import {
  CSSProperties,
  forwardRef,
  ForwardedRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
  ChangeEvent
} from 'react'
import {
  FormHelperText,
  RadioGroup,
  RadioGroupProps as MuiRadioGroupProps,
  FormControlLabelProps,
  Radio,
  FormControlLabel
} from '@mui/material'
import { useInputStyles } from '../style'
import { BasicProps, MergeMuiElementProps } from '@komune-io/g2-themes'
import { Option, SmartKey } from '../Select'
import { extractNumberOrBooleanFromString } from '@komune-io/g2-utils'
import { TextField, TextFieldProps } from '../TextField'

export type Choice = Option & {
  props?: FormControlLabelProps
  /**
   * set this to `true` if you want the label to appear as an editable textfield. The value returned when selected will be the value entered by the user.
   * Don't add more than one
   */
  editableLabel?: boolean
  editableLabelProps?: Omit<TextFieldProps, 'value' | 'onChange'>
}

export interface RadioChoicesClasses {
  helperText?: string
  choice?: string
}

export interface RadioChoicesStyles {
  helperText?: CSSProperties
  choice?: CSSProperties
}

export interface RadioChoicesBasicProps extends BasicProps {
  /**
   * The value selected
   *
   * @default ''
   */
  value?: SmartKey

  /**
   * The event called when the value of the input change
   */
  onChange?: (value: SmartKey) => void

  /**
   * List of options available in the option
   *
   * @default []
   */
  options?: Choice[]

  /**
   * Define if the value of the input is valid or not
   *
   * @default false
   */
  error?: boolean

  /**
   * The message displayed when `error` is true
   */
  errorMessage?: string
  /**
   * The helper message below the field
   */
  helperText?: string
  /**
   * The classes applied to the different part of the component
   */
  classes?: RadioChoicesClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: RadioChoicesStyles
}

export type RadioChoicesProps = MergeMuiElementProps<
  Omit<MuiRadioGroupProps, 'ref'>,
  RadioChoicesBasicProps
>

export const RadioChoices = forwardRef(
  (props: RadioChoicesProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      value = '',
      name,
      options = [],
      className,
      onChange,
      style,
      id,
      error = false,
      errorMessage = '',
      classes,
      styles,
      helperText,
      ...other
    } = props

    const [editableLabel, setEditableLabel] = useState<{
      key?: SmartKey
      label?: string | number
    }>({
      label: ''
    })

    useEffect(() => {
      options.forEach((choice) => {
        if (choice.editableLabel && !editableLabel.label) {
          setEditableLabel({
            key: choice.key,
            label: choice.label
          })
        }
      })
    }, [options])

    useEffect(() => {
      if (value && options.find((option) => option.key === value)) {
        const editable = options.find((choice) => choice.editableLabel)
        if (editable) {
          setEditableLabel({
            key: editable.key,
            label: value.toString()
          })
        }
      }
    }, [])

    const editedLabelKey = useMemo(() => {
      if (editableLabel.label === value) {
        return editableLabel.key
      }
      return undefined
    }, [value, editableLabel.label])

    const onChangeMemoized = useCallback(
      (_: ChangeEvent<HTMLInputElement>, value: string) => {
        const edited =
          value === editableLabel.key ? editableLabel.label : undefined
        onChange && onChange(edited ?? extractNumberOrBooleanFromString(value))
      },
      [onChange, editableLabel]
    )

    const defaultStyles = useInputStyles()

    const choicesMemoized = useMemo(() => {
      return options.map((choice) => (
        <FormControlLabel
          key={choice.key.toString()}
          value={choice.key}
          label={
            choice.editableLabel ? (
              <TextField
                {...choice.editableLabelProps}
                value={editableLabel.label}
                onChange={(value) => {
                  setEditableLabel({
                    key: choice.key,
                    label: value
                  })
                  onChange && onChange(value)
                }}
              />
            ) : (
              choice.label
            )
          }
          {...choice.props}
          control={<Radio />}
          color='primary'
          className={defaultStyles.cx(
            'AruiRadioChoices-choice',
            classes?.choice
          )}
          style={styles?.choice}
        />
      ))
    }, [options, classes?.choice, styles?.choice, editableLabel])

    const errorText = useMemo(
      () =>
        (errorMessage !== '' && error) || helperText ? (
          <FormHelperText
            className={defaultStyles.cx(
              errorMessage !== '' && error
                ? defaultStyles.classes.errorHelperText
                : defaultStyles.classes.helperText,
              'AruiRadioChoices-helperText',
              classes?.helperText
            )}
            style={styles?.helperText}
          >
            {error ? errorMessage ?? helperText : helperText}
          </FormHelperText>
        ) : (
          <></>
        ),
      [errorMessage, error, helperText]
    )
    return (
      <div
        className={defaultStyles.cx(
          defaultStyles.classes.root,
          'AruiRadioChoices-root',
          className
        )}
        style={style}
      >
        <RadioGroup
          id={id}
          ref={ref}
          value={editedLabelKey ?? value}
          onChange={onChangeMemoized}
          name={name}
          className={defaultStyles.cx('AruiRadioChoices-root', className)}
          style={style}
          {...other}
        >
          {choicesMemoized}
          {errorText}
        </RadioGroup>
      </div>
    )
  }
)
