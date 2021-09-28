import { lowLevelStyles, Theme } from '@smartb/g2-themes'

const darkGrey = '#BDBDBD'

export const useFilterInputStyles = lowLevelStyles<Theme>()({
  label: {
    fontSize: '14px',
    color: '#323338'
  },
  input: {
    '& .MuiInputBase-input': {
      padding: '5px 7px',
      fontSize: '14px',
      color: 'inherit'
    },
    '& .MuiSelect-root': {
      borderRadius: '4px',
      textOverflow: 'ellipsis'
    },
    '& .MuiFilledInput-adornedEnd': {
      paddingRight: '10px'
    },
    '& .MuiFilledInput-adornedStart': {
      paddingLeft: '10px'
    },
    '& .MuiInputBase-root': {
      width: '100%',
      margin: `0px`,
      paddingTop: '0px',
      boxShadow: '0px 0px 0px 1px transparent',
      borderRadius: '4px',
      color: '#323338',
      minWidth: '100px',
      backgroundColor: 'white',
      transition: 'background-color 200ms'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      '& legend': {
        height: 15,
        '& span': {
          padding: 0
        }
      }
    },
    '& .MuiOutlinedInput-adornedStart': {
      paddingLeft: '8px'
    },
    '& .MuiInputAdornment-positionStart': {
      marginRight: '0px'
    },
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: '8px'
    },
    '& .MuiInputAdornment-positionEnd': {
      marginLeft: '0px'
    },
    '& .MuiInputBase-root.Mui-disabled': {
      opacity: 0.7
    },
    '& .MuiSelect-select:focus': {
      background: 'unset'
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: '#323338'
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 6.5px) scale(1)'
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)'
    },
    '& .MuiFilledInput-underline:before': {
      borderBottom: 'none'
    },
    '& .MuiFilledInput-underline:after': {
      borderBottom: 'none'
    },
    '& .MuiFilledInput-input': {
      padding: '0px 10px'
    },
    '& .MuiFilledInput-inputAdornedStart': {
      padding: '0px 10px 0px 0px'
    },
    '& .MuiFilledInput-inputAdornedEnd': {
      padding: '0px 0px 0px 10px'
    },
    '& .MuiOutlinedInput-input::placeholder': {
      fontSize: '14px',
      color: 'inherit',
      opacity: 1
    },
    '& .MuiInputAdornment-filled.MuiInputAdornment-positionStart:not(.MuiInputAdornment-hiddenLabel)':
      {
        marginTop: '0px !important'
      }
  },
  inputOutlinedGreyColor: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: `2px solid ${darkGrey}`
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: darkGrey
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: darkGrey
    },
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: darkGrey
    }
  },
  inputOutlinedPrimaryColor: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: (theme) => `2px solid ${theme.colors.primary}`
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: (theme) => theme.colors.primary
    },
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: (theme) => theme.colors.primary
    }
  },
  inputOutlinedSecondaryColor: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: (theme) => `2px solid ${theme.colors.secondary}`
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: (theme) => theme.colors.secondary
    },
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: (theme) => theme.colors.secondary
    }
  },
  inputFilledGreyColor: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: ` 2px solid ${darkGrey}`
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: darkGrey
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: darkGrey
    },
    '& .MuiInputBase-root': {
      backgroundColor: '#F2F2F2'
    },
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: darkGrey
    }
  },
  inputFilledPrimaryColor: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: (theme) => `2px solid ${theme.colors.primary}`
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: (theme) => theme.colors.primary
    },
    '& .MuiInputBase-root': {
      backgroundColor: (theme) => theme.colors.primary
    },
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: (theme) => theme.colors.primary
    }
  },
  inputFilledSecondaryColor: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: (theme) => `2px solid ${theme.colors.secondary}`
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: (theme) => theme.colors.secondary
    },
    '& .MuiInputBase-root': {
      backgroundColor: (theme) => theme.colors.secondary
    },
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: (theme) => theme.colors.secondary
    }
  },
  inputWithClear: {
    '& .MuiFilledInput-inputAdornedEnd': {
      padding: '0px 15px 0px 10px'
    }
  },
  clear: {
    position: 'absolute',
    right: '4px',
    top: '50%',
    marginTop: '-10px',
    cursor: 'pointer',
    width: '21px',
    height: '21px',
    color: 'inherit'
  }
})
