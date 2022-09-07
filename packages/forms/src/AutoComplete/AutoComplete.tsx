import {
  AutocompleteRenderOptionState,
  Box,
  createFilterOptions,
  FilterOptionsState,
  FormHelperText,
  ListItem,
  ListItemText
} from '@mui/material'
import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  AutocompleteGetTagProps,
  AutocompleteRenderInputParams
} from '@mui/material'
import React, { forwardRef, useCallback } from 'react'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { TextField, TextFieldProps } from '../TextField'
import { CheckBox } from '../CheckBox'
import { Chip } from '@smartb/g2-components'
import { useInputStyles } from '../style'

export interface AutoCompleteClasses {
  autocomplete?: string
  helperText?: string
}

export interface AutoCompleteStyles {
  autocomplete?: React.CSSProperties
  helperText?: React.CSSProperties
}

export interface AutoCompleteBasicProps<T> extends BasicProps {
  /**
   * The value selected
   */
  value?: T
  /**
   * The values of selected. ⚠️ This prop is used only if `multiple` is true
   *
   * @default []
   */
  values?: T[]
  /**
   * The event called when the value of the slect change
   */
  onChangeValue?: (value?: T) => void
  /**
   * The event called when the values of the multiple select change
   */
  onChangeValues?: (values: T[]) => void
  /**
   * If true, the menu will support multiple selections.
   */
  multiple?: boolean
  /**
   * List of option available in the option
   */
  options: T[]
  /**
   * The event called when search value change.
   * @param value
   */
  onSearch?: (value: string) => void
  /**
   * return the label of the option
   * @param option
   */
  getOptionLabel?: (option: T) => string
  /**
   * pass this prop to false if your list is too big and creating performance issues
   * @default true
   */
  noFilterDisplayOptions?: boolean
  /**
   * This props will tell how many options are alowed to be displayed in the result list. If you want no sie restriction pass a negative number
   * @default -1
   */
  optionsResultLimit?: number
  /**
   * If true the input will be disabled
   *
   * @default false
   */
  disabled?: boolean
  /**
   * If props given to the textField in the autoComplete
   */
  textFieldProps?: TextFieldProps
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
   * The classes applied to the different part of the component
   */
  classes?: AutoCompleteClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: AutoCompleteStyles
}

export type AutoCompleteProps<T = any> = MergeMuiElementProps<
  Omit<MuiAutocompleteProps<T, undefined, undefined, undefined>, 'renderInput'>,
  AutoCompleteBasicProps<T>
>

const defaultFilterOptions = createFilterOptions()
const defaultGetOptionLabel = (option: any) => option.label ?? ''

const AutoCompleteBase = function <T>(
  props: AutoCompleteProps<T>,
  ref: React.ForwardedRef<HTMLElement>
) {
  const {
    className,
    style,
    multiple = false,
    id,
    options,
    value,
    values,
    onChangeValue,
    onChangeValues,
    defaultValue = null,
    onSearch,
    getOptionLabel = defaultGetOptionLabel,
    textFieldProps,
    disabled,
    isOptionEqualToValue,
    noFilterDisplayOptions = true,
    optionsResultLimit = -1,
    error = false,
    errorMessage = '',
    classes,
    styles,
    ...other
  } = props

  const defaultStyles = useInputStyles()

  const onChangeMemoized = useCallback(
    (_: React.SyntheticEvent<Element, Event>, value: T | T[] | null) => {
      if (Array.isArray(value)) {
        onChangeValues && onChangeValues(value)
      } else {
        onChangeValue && onChangeValue(value ?? undefined)
      }
    },
    [onChangeValue, onChangeValues]
  )

  const renderTags = useCallback(
    (value: T[], getTagProps: AutocompleteGetTagProps) =>
      value.map((option: T, index: number) => {
        const { key, ...other } = getTagProps({ index })
        return (
          //@ts-ignore
          <Chip
            key={option.key ?? key}
            label={getOptionLabel(option)}
            {...other}
          />
        )
      }),
    [getOptionLabel]
  )

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => {
      return <TextField {...textFieldProps} {...params} />
    },
    [textFieldProps]
  )

  const renderOption = useCallback(
    (
      props: React.HTMLAttributes<HTMLLIElement>,
      option: T,
      { selected }: AutocompleteRenderOptionState
    ) => {
      //@ts-ignore
      const { key, ...other } = props
      return (
        <ListItem
          //@ts-ignore
          key={option.key ?? key}
          className={defaultStyles.cx('AruiAutoComplete-option')}
          {...other}
        >
          <CheckBox checked={selected} />
          <ListItemText primary={getOptionLabel(option)} />
        </ListItem>
      )
    },
    [getOptionLabel]
  )

  const filterOptions = useCallback(
    (options: T[], state: FilterOptionsState<T>): T[] => {
      const inputTrimmed = state.inputValue.trim()
      if (!noFilterDisplayOptions && !inputTrimmed) return []
      const result = defaultFilterOptions(options, state) as T[]
      if (optionsResultLimit >= 0) {
        return result.splice(0, optionsResultLimit)
      }
      return result
    },
    [noFilterDisplayOptions, optionsResultLimit]
  )

  const defaultIsOptionEqualToValue = useCallback(
    //@ts-ignore
    (option: T, value: T) => option.key === value.key || option.key === value,
    []
  )
  //@ts-ignore
  const hasKey = values ? !!values[0]?.key : !!value?.key

  return (
    <Box
      className={defaultStyles.cx('AruiAutoComplete-root', className)}
      sx={{
        position: 'relative',
        '& .AruiAutoComplete-listbox': {
          padding: '0px'
        }
      }}
      style={style}
    >
      <MuiAutocomplete<T, boolean, undefined, undefined>
        id={id}
        ref={ref}
        value={multiple ? values : value}
        limitTags={2}
        multiple={multiple}
        options={options}
        className={defaultStyles.cx(
          'AruiAutoComplete-autocomplete',
          classes?.autocomplete
        )}
        getOptionLabel={getOptionLabel}
        style={styles?.autocomplete}
        disabled={disabled}
        disableCloseOnSelect={multiple}
        onChange={onChangeMemoized}
        renderTags={renderTags}
        renderInput={renderInput}
        renderOption={renderOption}
        isOptionEqualToValue={
          isOptionEqualToValue ?? hasKey
            ? defaultIsOptionEqualToValue
            : undefined
        }
        filterOptions={filterOptions}
        classes={{
          listbox: 'AruiAutoComplete-listbox'
        }}
        {...other}
      />
      {errorMessage !== '' && error && (
        <FormHelperText
          className={defaultStyles.cx(
            defaultStyles.classes.helperText,
            'AruiSelect-helperText',
            classes?.helperText
          )}
          style={styles?.helperText}
        >
          {errorMessage}
        </FormHelperText>
      )}
    </Box>
  )
}

export const AutoComplete = forwardRef(
  AutoCompleteBase
) as typeof AutoCompleteBase
