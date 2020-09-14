import React from 'react'
import {
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps
} from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import { MergeMuiElementProps, BasicProps } from '../Types'
import clsx from 'clsx'

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      margin: '8px 16px'
    },
    formControl: {
      width: '100%',
      borderRadius: '21.6px',
      boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.09)',
      backgroundColor: '#ffffff',
      fontSize: '14px',
      color: '#535353',
      padding: '0 13px',
      marginBottom: '8px',
      minHeight: '40px',
      '&::before': {
        content: 'none'
      },
      '&::after': {
        content: 'none'
      }
    }
  })
)

export interface SelectItem {
  value: string
  label: string
}

interface SelectClasses {
  label?: string
  select?: string
}

interface SelectStyles {
  label?: React.CSSProperties
  select?: React.CSSProperties
}

interface SelectProps extends BasicProps {
  label: string
  value?: string
  items: SelectItem[]
  disabled?: boolean
  onChange?: (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    child: React.ReactNode
  ) => void
  classes?: SelectClasses
  styles?: SelectStyles
}

type Props = MergeMuiElementProps<MuiSelectProps, SelectProps>

export const Select = (props: Props) => {
  const {
    label,
    items,
    value,
    onChange,
    disabled = false,
    className,
    style,
    id,
    classes,
    styles,
    ...other
  } = props
  const defaultClasses = useStyles()
  return (
    <div className={clsx(className, 'AruiSelect-root')} style={style}>
      <InputLabel
        htmlFor={id}
        className={clsx(
          defaultClasses.title,
          'AruiSelect-label',
          classes?.label
        )}
      >
        {label}
      </InputLabel>
      <MuiSelect
        className={clsx(
          defaultClasses.formControl,
          'AruiSelect-select',
          classes?.select
        )}
        value={value}
        onChange={onChange}
        disabled={disabled}
        inputProps={{
          id: id
        }}
        {...other}
      >
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </div>
  )
}