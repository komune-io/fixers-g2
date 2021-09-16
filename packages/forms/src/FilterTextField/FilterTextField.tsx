import React, { useCallback, useMemo } from 'react'
import {
  InputAdornment,
  TextField as MuiTextField,
  OutlinedTextFieldProps as MuiOutlinedTextFieldProps,
  InputLabelProps,
} from '@material-ui/core'
import { useFilterInputStyles } from '../style'
import { BasicProps, lowLevelStyles, MergeMuiElementProps, useTheme } from '@smartb/g2-themes'
import clsx from 'clsx'
import { SearchIcon } from '../assets/icons'
import { ClearRounded } from '@material-ui/icons'
import tinycolor from "tinycolor2"

const useStyles = lowLevelStyles()({
  root: {
    position: "relative",
    width: "fit-content",
    "& .MuiInputBase-input": {
      minWidth: "60px"
    }
  },
  searchIcon: {
    width: "17px",
    height: "17px",
    cursor: "pointer",
    color: "currentColor",
    fill: "currentColor"
  },
  input: {
    width: "100%",
  },
  withIconEndOnRemove: {
    '& .MuiInputBase-input': {
      paddingRight: '18px'
    }
  }
})

export interface FilterTextFieldClasses {
  label?: string
  textfield?: string
  input?: string
  clearIcon?: string
  searchIcon?: string
}

export interface FilterTextFieldStyles {
  label?: React.CSSProperties
  textfield?: React.CSSProperties
  input?: React.CSSProperties
  clearIcon?: React.CSSProperties
  searchIcon?: React.CSSProperties
}

export interface FilterTextFieldBasicProps extends BasicProps {
  /**
   * The value displayed
   */
  value?: string | number

  /**
   * The type of the input
   * 
   * @default 'text'
   */
  textFieldType?: 'number' | 'text' | 'email' | 'password' | 'search'

  /**
   * The label of the input
   */
  label?: string

  /**
   * The event called when the value of the input change
   */
  onChange?: (value: string) => void

  /**
   * The default value displayed. Usefull if the input is uncontrolled
   */
  defaultValue?: string | number

  /**
   * Define if the input is disabled or not
   * 
   * @default false
   */
  disabled?: boolean

  /**
  * If true the input will be disabled
  * 
  * @default 'primary'
  */
  color?: 'primary' | 'secondary' | 'default'

  /**
  * If true the input will be disabled
  * 
  * @default 'filled'
  */
  variant?: 'filled' | 'outlined'

  /**
   * The icon of the icon
   */
  inputIcon?: React.ReactNode

  /**
   * The event called when the value of the input is removed
   */
  onRemove?: () => void

  /**
   * The position of the icon
   * 
   * @default 'start'
   */
  iconPosition?: 'start' | 'end'

  /**
   * The event called when a search request is send when the `textFieldType` is equal to 'search'
   */
  onSearch?: () => void

  /**
  * The classes applied to the different part of the component
  */
  classes?: FilterTextFieldClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: FilterTextFieldStyles
  /**
   * The porps given to the label component
   */
  InputLabelProps?: Partial<InputLabelProps>
}

export type FilterTextFieldProps = MergeMuiElementProps<Omit<MuiOutlinedTextFieldProps, "ref">, FilterTextFieldBasicProps>

export const FilterTextField = React.forwardRef((props: FilterTextFieldProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const {
    className,
    error = false,
    label = '',
    id = '',
    onChange,
    style,
    textFieldType = "text",
    defaultValue,
    value,
    disabled = false,
    inputIcon,
    onRemove,
    classes,
    styles,
    iconPosition = 'start',
    onSearch,
    InputProps,
    color = 'primary',
    variant = 'filled',
    inputProps,
    InputLabelProps,
    ...other
  } = props
  const theme = useTheme()
  const defaultClasses = useFilterInputStyles(theme)
  const classesLocal = useStyles()
  const colorStyle = useMemo(() => {
    if (color === "primary") {
      const isPrimaryDark = tinycolor(theme.colors.primary).isDark()
      if (isPrimaryDark) return { color: "white" }
    }
    if (color === "secondary") {
      const isSecondaryDark = tinycolor(theme.colors.secondary).isDark()
      if (isSecondaryDark) return { color: "white" }
    }
    return {}
  }, [color, theme.colors.primary, theme.colors.secondary])

  const onChangeMemoized = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange && onChange(e.target.value),
    [onChange],
  )

  const upHandler = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.key === 'Enter') {
        event.currentTarget.blur()
        onSearch && onSearch()
      }
    },
    [onSearch],
  )

  const inputAdornment = useMemo(() => {
    const abordementStyles = variant === "filled" ? colorStyle : undefined
    if (textFieldType === "search") {
      if (iconPosition === 'start') {
        return {
          startAdornment: (
            <InputAdornment style={abordementStyles} component='div' position='start'>
              <SearchIcon onClick={onSearch} className={clsx(classesLocal.searchIcon, classes?.searchIcon, "AruiTextfield-searchIcon")} style={styles?.searchIcon} />
            </InputAdornment>
          )
        }
      } else {
        return {
          endAdornment: (
            <InputAdornment style={abordementStyles} component='div' position='end'>
              <SearchIcon onClick={onSearch} className={clsx(classesLocal.searchIcon, classes?.searchIcon, "AruiTextfield-searchIcon")} style={styles?.searchIcon} />
            </InputAdornment>
          )
        }
      }
    } else {
      if (inputIcon && iconPosition === 'start') {
        return {
          startAdornment: (
            <InputAdornment style={abordementStyles} component='div' position='start'>
              {inputIcon}
            </InputAdornment>
          )
        }
      } else if (inputIcon) {
        return {
          endAdornment: (
            <InputAdornment style={abordementStyles} component='div' position='end'>
              {inputIcon}
            </InputAdornment>
          )
        }
      }
      return {}
    }
  }, [textFieldType, inputIcon, iconPosition, classes?.searchIcon, styles?.searchIcon, onSearch, colorStyle, variant])

  const rightIcon = useMemo(() => {
    if (!value || value === "") return undefined
    if (onRemove && !disabled) return (
      <ClearRounded onClick={onRemove} className={clsx(defaultClasses.clear, classes?.clearIcon, "AruiTextfield-clearIcon")} style={{ ...styles?.clearIcon, right: inputAdornment.endAdornment ? "22px" : "" }} />
    )
    return undefined
  }, [value, onRemove, classes?.clearIcon, styles?.clearIcon, inputAdornment.endAdornment, disabled])

  const getVariantColorClass = () => {
    if (variant === "outlined") {
      switch (color) {
        case 'primary':
          return defaultClasses.inputOutlinedPrimaryColor
        case 'secondary':
          return defaultClasses.inputOutlinedSecondaryColor
        case 'default':
          return defaultClasses.inputOutlinedGreyColor
      }
    }
    switch (color) {
      case 'primary':
        return defaultClasses.inputFilledPrimaryColor
      case 'secondary':
        return defaultClasses.inputFilledSecondaryColor
      case 'default':
        return defaultClasses.inputFilledGreyColor
      default:
        return defaultClasses.inputFilledGreyColor
    }
  }

  const inputStyles = useMemo(() => ({ ...styles?.input, paddingRight: onRemove && value && value !== "" && !inputAdornment.endAdornment ? '20px' : '' }), [styles?.input, onRemove, value, inputAdornment.endAdornment])

  return (
    <div
      className={clsx(className, classesLocal.root, "AruiTextfield-root")}
      style={variant === "filled" ? { ...style, ...colorStyle } : style}
    >
      <MuiTextField
        {...other}
        ref={ref}
        id={id}
        label={variant === "outlined" ? label : undefined}
        InputLabelProps={{ ...InputLabelProps, className: clsx(defaultClasses.label, "AruiTextfield-label", classes?.label), style: styles?.label }}
        placeholder={variant === "filled" ? label : undefined}
        variant='outlined'
        color={color !== 'default' ? color : undefined}
        value={value}
        onChange={onChangeMemoized}
        type={textFieldType === "search" ? "text" : textFieldType}
        defaultValue={defaultValue}
        className={clsx(
          defaultClasses.input,
          classesLocal.input,
          onRemove && inputAdornment.endAdornment && textFieldType === "search" && defaultClasses.inputWithClear,
          classes?.textfield,
          getVariantColorClass(),
          "AruiTextfield-Textfield"
        )}
        style={styles?.textfield}
        disabled={disabled}
        inputProps={{ size: "5", ...inputProps }}
        InputProps={{
          ...inputAdornment,
          onKeyUp: upHandler,
          style: variant === "filled" ? { ...inputStyles, ...colorStyle } : inputStyles,
          className: clsx(
            inputIcon && iconPosition === 'end' && onRemove && classesLocal.withIconEndOnRemove,
            classes?.input,
            "AruiTextfield-input",
          ),
          ...InputProps
        }}
      />
      {rightIcon}
    </div>
  )
})
