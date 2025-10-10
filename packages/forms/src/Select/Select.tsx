import React, { useCallback, useMemo } from 'react'
import {
  Box,
  FormControl,
  FormHelperText,
  InputBaseComponentProps,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
  SelectProps as MuiSelectProps
} from '@mui/material'
import { ClearRounded } from '@mui/icons-material'
import { SelectIcon } from '../assets/icons'
import { useInputStyles } from '../style'
import {
  BasicProps,
  makeG2STyles,
  MergeMuiElementProps
} from '@komune-io/g2-themes'
import { CheckBox } from '../CheckBox'
import { extractNumberOrBooleanFromString } from '@komune-io/g2-utils'

export type SmartKey = string | number | boolean

export type Option = {
  key: SmartKey
  label?: string | number
  /**
   * The icon of the option only used for Select component.
   * If the option is selected and the select is not multiple the icon is displayed in the Select Component.
   */
  icon?: React.ReactNode
  color?: string
}

export interface SelectClasses {
  select?: string
  input?: string
  helperText?: string
  selectIcon?: string
  clearIcon?: string
  option?: string
  menu?: string
}

export interface SelectStyles {
  select?: React.CSSProperties
  input?: React.CSSProperties
  helperText?: React.CSSProperties
  selectIcon?: React.CSSProperties
  clearIcon?: React.CSSProperties
  option?: React.CSSProperties
  menu?: React.CSSProperties
}

const useStyles = makeG2STyles()({
  formcontrol: {
    width: '100%'
  },
  root: {
    '& .MuiFilledInput-input': {
      margin: '0px 5px'
    }
  },
  disabledStyle: {
    '& .MuiSelect-root': {
      color: '#676879B3',
      fontSize: '14px'
    }
  },
  clear: {
    position: 'absolute',
    right: '35px',
    top: '50%',
    marginTop: '-12px',
    cursor: 'pointer',
    color: 'rgba(0, 0, 0, 0.54)'
  },
  list: {
    padding: '0px'
  },
  selectPaddingWithClear: {
    paddingRight: '12px'
  },
  selectPadding: {
    '& .MuiSelect-root': {
      paddingRight: '30px',
      margin: '0px'
    }
  },
  menu: {
    marginTop: '5px'
  }
})

export interface SelectBasicProps extends BasicProps {
  /**
   * The value selected
   *
   * @default ''
   */
  value?: SmartKey

  /**
   * The values of selected. ⚠️ This prop is used only if `multiple` or `singleInArray` is true
   *
   * @default []
   */
  values?: SmartKey[]

  /**
   * If true the select will be able to handle multiple selections
   *
   *  @default false
   */
  multiple?: boolean

  /**
   * If true the select will still have unique selection but the value will be wrapped in an array
   * and returned in `onChangeValues`
   *
   *  @default false
   */
  singleInArray?: boolean

  /**
   * The event called when the value of the slect change
   */
  onChangeValue?: (value: SmartKey) => void

  /**
   * The event called when the values of the multiple select change
   */
  onChangeValues?: (values: SmartKey[]) => void

  /**
   * The size of the input
   *
   *  @default "medium"
   */
  size?: 'large' | 'medium' | 'small'

  /**
   * List of options available in the option
   *
   * @default []
   */
  options?: Option[]

  /**
   * The text to display as place holder
   */
  placeholder?: string

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
   * The event called when the value or the values of the input are removed
   */
  onRemove?: () => void
  /**
   * If true the input will be disabled
   *
   * @default false
   */
  disabled?: boolean
  /**
   * The classes applied to the different part of the component
   */
  classes?: SelectClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: SelectStyles
}

export type SelectProps = MergeMuiElementProps<MuiSelectProps, SelectBasicProps>

export const Select = React.forwardRef(
  (props: SelectProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const {
      value = '',
      values = [],
      onChangeValue,
      onChangeValues,
      name,
      options = [],
      className,
      placeholder = '',
      style,
      id,
      error = false,
      errorMessage = '',
      onRemove = !props.required
        ? () => {
            onChangeValue && onChangeValue('')
            onChangeValues && onChangeValues([])
          }
        : undefined,
      disabled = false,
      classes,
      styles,
      size = 'medium',
      multiple = false,
      singleInArray = false,
      startAdornment,
      onClose,
      helperText,
      ...other
    } = props

    const defaultStyles = useInputStyles()
    const localStyles = useStyles()

    const onChangeMemoized = useCallback(
      (event: SelectChangeEvent<unknown>) => {
        const eventValue =
          singleInArray && !Array.isArray(event.target.value)
            ? [event.target.value]
            : event.target.value
        if (Array.isArray(eventValue)) {
          onChangeValues &&
            onChangeValues(extractNumberOrBooleanFromString(eventValue))
        } else {
          onChangeValue &&
            onChangeValue(
              extractNumberOrBooleanFromString(eventValue as string)
            )
        }
      },
      [onChangeValue, onChangeValues, singleInArray]
    )

    const optionsMap = useMemo(
      () =>
        new Map<SmartKey, Option>(options.map((el) => [el.key.toString(), el])),
      [options]
    )

    const currentOption = useMemo(
      () => (value ? optionsMap.get(value.toString()) : undefined),
      [value, optionsMap]
    )

    const renderValue = useCallback(
      (selected: string | string[]) => {
        if (
          (!Array.isArray(selected) && selected === '') ||
          (Array.isArray(selected) && selected.length === 0)
        ) {
          return placeholder
        }
        if (Array.isArray(selected) && selected.length > 0) {
          return selected
            .map((el) => optionsMap.get(el.toString())?.label)
            .filter((el) => el !== undefined)
            .join(', ')
        }
        if (!Array.isArray(selected)) {
          return optionsMap.get(selected.toString())?.label
        }
        return ''
      },
      [placeholder, optionsMap]
    )

    const selectIcon = useCallback(
      (props) => (
        <SelectIcon
          {...props}
          color='#98A5AE'
          className={defaultStyles.cx(
            'AruiSelect-selectIcon',
            classes?.selectIcon,
            props.className
          )}
          sx={{
            width: '12px',
            height: '12px'
          }}
          style={{
            right: '10px',
            top: 'calc(50% - 5px)',
            ...styles?.selectIcon
          }}
        />
      ),
      []
    )

    const optionsMemoized = useMemo(() => {
      return options.map((option) => (
        //@ts-ignore
        <MenuItem
          data-value={option.key.toString()}
          className={defaultStyles.cx('AruiSelect-option', classes?.option)}
          style={styles?.option}
          key={option.key.toString()}
          value={option.key}
        >
          <CheckBox
            data-value={option.key.toString()}
            checked={values.indexOf(option.key) > -1 || value === option.key}
          />
          {option.icon && <ListItemIcon>{option.icon}</ListItemIcon>}
          <ListItemText
            data-value={option.key.toString()}
            primary={option.label as string}
          />
        </MenuItem>
      ))
    }, [options, values, value, classes?.option, styles?.option])

    const inputProp: InputBaseComponentProps = useMemo(() => {
      return {
        name: name,
        className: defaultStyles.cx('AruiSelect-select', classes?.input),
        style: styles?.input,
        id: id
      }
    }, [name, onRemove, value, classes?.input, styles?.input, id])

    const onCloseMemoized = useCallback(
      (event: React.SyntheticEvent<Element, Event>) => {
        //@ts-ignore
        const valueClicked = event.currentTarget.dataset.value
        onRemove &&
          value &&
          valueClicked &&
          value.toString() === valueClicked.toString() &&
          onRemove()
        onClose && onClose(event)
      },
      [value, onRemove, onClose]
    )

    const canRemove =
      (value !== '' || values.length > 0) && onRemove && !disabled

    return (
      <FormControl
        variant='filled'
        className={defaultStyles.cx(
          defaultStyles.classes.input,
          localStyles.classes.formcontrol,
          size === 'large' && defaultStyles.classes.inputLarge,
          size === 'medium' && defaultStyles.classes.inputMedium,
          size === 'small' && defaultStyles.classes.inputSmall,
          disabled && defaultStyles.classes.inputDisabled,
          error && defaultStyles.classes.inputError,
          'AruiSelect-root',
          className
        )}
        style={style}
        error={error}
      >
        <Box
          sx={{
            position: 'relative'
          }}
        >
          <MuiSelect
            {...other}
            ref={ref}
            className={defaultStyles.cx(
              localStyles.classes.root,
              values && value === '' && values.length <= 0 && placeholder
                ? localStyles.classes.disabledStyle
                : '',
              canRemove
                ? localStyles.classes.selectPaddingWithClear
                : localStyles.classes.selectPadding,
              'AruiSelect-select',
              classes?.select
            )}
            variant={'filled'}
            value={multiple || singleInArray ? values : value}
            onClose={onCloseMemoized}
            multiple={multiple}
            IconComponent={selectIcon}
            onChange={onChangeMemoized}
            startAdornment={currentOption?.icon ?? startAdornment}
            inputProps={inputProp}
            renderValue={renderValue}
            displayEmpty
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center'
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'center'
              },
              classes: { list: localStyles.classes.list },
              className: defaultStyles.cx(
                localStyles.classes.menu,
                'AruiSelect-menu',
                classes?.menu
              ),
              style: styles?.menu
            }}
            style={styles?.select}
            disabled={disabled}
          >
            {optionsMemoized}
          </MuiSelect>
          {canRemove && (
            <ClearRounded
              onClick={onRemove}
              className={defaultStyles.cx(
                localStyles.classes.clear,
                'AruiSelect-clearIcon',
                classes?.clearIcon
              )}
              style={styles?.clearIcon}
            />
          )}
        </Box>
        {((errorMessage !== '' && error) || helperText) && (
          <FormHelperText
            className={defaultStyles.cx(
              errorMessage !== '' && error
                ? defaultStyles.classes.errorHelperText
                : defaultStyles.classes.helperText,
              'AruiSelect-helperText',
              classes?.helperText
            )}
            style={styles?.helperText}
          >
            {error ? errorMessage ?? helperText : helperText}
          </FormHelperText>
        )}
      </FormControl>
    )
  }
)
