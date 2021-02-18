import React from 'react'

import {
  Checkbox,
  FormControlLabel,
  CheckboxProps as MuiCheckboxProps
} from '@material-ui/core'
import { RadioButtonUnchecked, CheckCircle } from '@material-ui/icons'
import { Theme, useTheme } from '../ThemeContextProvider'
import { BasicProps, MergeMuiElementProps, lowLevelStyles } from '../Types'

const useStyles = (theme: Theme) =>
  lowLevelStyles({
    root: {
      borderRadius: 20
    },
    container: {
      '& .MuiTypography-root': {
        fontSize: '14px'
      },
      '& .MuiButtonBase-root:hover': {
        background: 'transparent'
      }
    },
    icon: {
      color: theme.primaryColor
    },
    iconSize: {
      width: '22px',
      height: '22px'
    }
  })

export interface CheckBoxBasicProps extends BasicProps {
  /**
   * If true, the component is checked
   */
  checked: boolean
  /**
   * The content that will be displayed
   */
  text?: string
  /**
   * If true, the checkbox will be disabled
   */
  disabled?: boolean
  /**
   * Callback fired when the state is changed
   */
  onChange?: () => void
  /**
   * The value of the component
   */
  value?: string
  /**
   * ClassName for the checked icon
   */
  checkedIconClassName?: string
  /**
   * Style for the checked icon
   */
  checkedIconStyle?: React.CSSProperties
}

type CheckBoxProps = MergeMuiElementProps<MuiCheckboxProps, CheckBoxBasicProps>

export const CheckBox = (props: CheckBoxProps) => {
  const {
    checked = false,
    text = '',
    disabled = false,
    onChange = () => {},
    value = '',
    className,
    id,
    style,
    checkedIconClassName,
    checkedIconStyle,
    ...other
  } = props
  const theme = useTheme()
  const classes = useStyles(theme)()

  return (
    <FormControlLabel
      value={value}
      className={`${classes.container} ${className}`}
      style={style}
      id={id}
      control={
        <Checkbox
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className={classes.root}
          disableRipple
          icon={<RadioButtonUnchecked className={classes.iconSize} />}
          checkedIcon={
            <CheckCircle
              className={`${classes.icon} ${classes.iconSize} ${checkedIconClassName}`}
              style={checkedIconStyle}
            />
          }
          {...other}
        />
      }
      label={text}
      labelPlacement='end'
    />
  )
}
