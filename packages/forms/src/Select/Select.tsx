import React, { useCallback, useMemo } from 'react'
import {
  FormControl,
  FormHelperText,
  InputBaseComponentProps,
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
} from '@smartb/g2-themes'
import clsx from 'clsx'
import { CheckBox } from '../CheckBox'

export type Option = {
  key: string | number
  label: string | number
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
  selectIcon: {
    width: '12px',
    height: '12px',
    right: '10px',
    top: 'calc(50% - 5px)'
  },
  list: {
    padding: '0px'
  },
  selectPaddingWithClear: {
    '& .MuiSelect-root': {
      paddingRight: '55px'
    }
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
   * @default '''
   */
  value?: string | number

  /**
   * The values of selected. ⚠️ This prop is used only if `multiple` is true
   *
   * @default []
   */
  values?: (string | number)[]

  /**
   * If true the select will be able to handle multiple selections
   *
   *  @default false
   */
  multiple?: boolean

  /**
   * The event called when the value of the slect change
   */
  onChangeValue?: (value: string) => void

  /**
   * The event called when the values of the multiple select change
   */
  onChangeValues?: (values: string[]) => void

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
      onRemove,
      disabled = false,
      classes,
      styles,
      size = 'medium',
      multiple = false,
      ...other
    } = props

    const defaultStyles = useInputStyles()
    const localStyles = useStyles()

    const onChangeMemoized = useCallback(
      (event: SelectChangeEvent<unknown>) => {
        const eventValue = event.target.value
        if (Array.isArray(eventValue)) {
          onChangeValues && onChangeValues(eventValue as string[])
        }
        onChangeValue && onChangeValue(eventValue as string)
      },
      [onChangeValue, onChangeValues]
    )

    const optionsMap = useMemo(
      () => new Map(options.map((el) => [el.key, el.label])),
      [options]
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
          return selected.map((el) => optionsMap.get(el)).join(', ')
        }
        if (!Array.isArray(selected)) {
          return optionsMap.get(selected)
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
          className={clsx(
            classes?.selectIcon,
            localStyles.classes.selectIcon,
            'AruiSelect-selectIcon',
            props.className
          )}
          style={styles?.selectIcon}
        />
      ),
      []
    )

    const optionsMemoized = useMemo(() => {
      return options.map((option) => (
        <MenuItem
          data-value={option.key}
          className={clsx(classes?.option, 'AruiSelect-option')}
          style={styles?.option}
          key={option.key}
          value={option.key}
        >
          <CheckBox
            data-value={option.key}
            checked={values.indexOf(option.key) > -1 || value === option.key}
          />
          <ListItemText
            data-value={option.key}
            primary={option.label as string}
          />
        </MenuItem>
      ))
    }, [options, values, value, classes?.option, styles?.option])

    const inputProp: InputBaseComponentProps = useMemo(() => {
      return {
        name: name,
        className: clsx(classes?.input, 'AruiSelect-select'),
        style: styles?.input,
        id: id
      }
    }, [name, onRemove, value, classes?.input, styles?.input, id])

    const onClose = useCallback(
      (event: React.SyntheticEvent<Element, Event>) => {
        if (!multiple) return
        //@ts-ignore
        const valueClicked = event.currentTarget.dataset.value
        onRemove && value === valueClicked && onRemove()
      },
      [value, onRemove, multiple]
    )

    const canRemove =
      (value !== '' || values.length > 0) && onRemove && !disabled

    return (
      <FormControl
        variant='filled'
        className={clsx(
          className,
          defaultStyles.classes.input,
          size === 'large' && defaultStyles.classes.inputLarge,
          size === 'medium' && defaultStyles.classes.inputMedium,
          size === 'small' && defaultStyles.classes.inputSmall,
          disabled && defaultStyles.classes.inputDisabled,
          error && defaultStyles.classes.inputError,
          localStyles.classes.formcontrol,
          'AruiSelect-root'
        )}
        style={style}
        error={error}
      >
        <MuiSelect
          {...other}
          ref={ref}
          className={clsx(
            localStyles.classes.root,
            values && value === '' && values.length <= 0 && placeholder
              ? localStyles.classes.disabledStyle
              : '',
            classes?.select,
            canRemove
              ? localStyles.classes.selectPaddingWithClear
              : localStyles.classes.selectPadding,
            'AruiSelect-select'
          )}
          variant={'filled'}
          value={multiple ? values : value}
          onClose={onClose}
          multiple={multiple}
          IconComponent={selectIcon}
          onChange={onChangeMemoized}
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
            className: clsx(
              localStyles.classes.menu,
              classes?.menu,
              'AruiSelect-menu'
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
            className={clsx(
              localStyles.classes.clear,
              classes?.clearIcon,
              'AruiSelect-clearIcon'
            )}
            style={styles?.clearIcon}
          />
        )}
        {errorMessage !== '' && error && (
          <FormHelperText
            className={clsx(
              defaultStyles.classes.helperText,
              classes?.helperText,
              'AruiSelect-helperText'
            )}
            style={styles?.helperText}
          >
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    )
  }
)
