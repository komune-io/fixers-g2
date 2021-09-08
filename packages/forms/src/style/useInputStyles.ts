import { lowLevelStyles, Theme } from '@smartb/g2-themes'

const darkGrey = '#323338'
const textFieldGrey = '#C5C7D0'
const disabledColor = "#E6E9EF"

export const useInputStyles = lowLevelStyles<Theme>()({
  label: {
    marginBottom: '15px',
    fontSize: 16,
    color: `${darkGrey}`
  },
  input: {
    '& .MuiInputBase-input': {
      padding: "6px 7px"
    },
    '& .MuiSelect-root': {
      backgroundColor: 'white',
      borderRadius: '5px',
      color: "#323338",
      textOverflow: 'ellipsis'
    },
    "& .MuiFilledInput-adornedEnd": {
      paddingRight: "10px"
    },
    "& .MuiFilledInput-adornedStart": {
      paddingLeft: "10px"
    },
    "& .MuiFilledInput-root.Mui-disabled": {
      border: `1px solid ${disabledColor}`,
      backgroundColor: disabledColor
    },
    '& .MuiInputBase-root': {
      margin: `0px`,
      paddingTop: "0px",
      border: `1px solid ${textFieldGrey}`,
      boxShadow: '0px 0px 0px 1px transparent',
      borderRadius: '4px',
      backgroundColor: "white"
    },
    '& .MuiInputBase-root.Mui-error': {
      margin: `0px`,
      border: theme => `1px solid ${theme.colors.error}`,
      boxShadow: '0px 0px 0px 1px  transparent',
      borderRadius: '4px',
      backgroundColor: "white"
    },
    '& .MuiInputBase-root:hover': {
      margin: `0px`,
      border:`1px solid ${darkGrey}`,
      borderRadius: '4px'
    },
    '& .MuiInputBase-root:focus': {
      margin: `0px`,
      border: theme => `1px solid ${theme.colors.secondary}`,
      borderRadius: '4px'
    },
    '& .MuiInputBase-root.Mui-focused': {
      margin: `0px`,
      border: theme => `1px solid ${theme.colors.secondary}`,
      borderRadius: '4px'
    },
    '& .MuiFormLabel-root.Mui-error': {
      color: theme => theme.colors.error
    },
    '& .MuiInputLabel-filled .MuiInputLabel-filled.MuiInputLabel-shrink': {
      transform: 'translate(12px, 21px) scale(1)'
    },
    '& .MuiFormLabel-root.Mui-focused': {
      fontWeight: 400,
      transform: 'translate(12px, 10px) scale(0.75)'
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
    "& .MuiFilledInput-inputAdornedStart": {
      padding: "0px 10px 0px 0px"
    },
    "& .MuiFilledInput-inputAdornedEnd": {
      padding: "0px 0px 0px 10px"
    },
    '& .MuiFilledInput-input::placeholder': {
      fontSize: '14px'
    },
    '& .MuiInputAdornment-filled.MuiInputAdornment-positionStart:not(.MuiInputAdornment-hiddenLabel)': {
      marginTop: '0px !important'
    }
  },
  inputValidated: {
    '& .MuiInputBase-root': {
      border: theme => `1px solid ${theme.colors.success}`,
    },
    '& .MuiInputBase-root:hover': {
      border: theme =>`1px solid ${theme.colors.success}`,
    },
    '& .MuiInputBase-root.Mui-focused': {
      border: theme => `1px solid ${theme.colors.success}`,
    },
    '& .MuiInputBase-root:focus': {
      border: theme => `1px solid ${theme.colors.success}`,
    }
  },
  inputError: {
    '& .MuiInputBase-root:hover': {
      border: theme => `1px solid ${theme.colors.error}`
    },
    '& .MuiInputBase-root.Mui-focused': {
      border: theme => `1px solid ${theme.colors.error}`,
    },
    '& .MuiInputBase-root:focus': {
      border: theme => `1px solid ${theme.colors.error}`,
    }
  },
  inputLarge: {
    '& .MuiInputBase-root': {
      minHeight: "48px" 
    },
    '& .MuiSelect-root': {
      height: "48px",
      lineHeight: "48px"
    }
  },
  inputMedium: {
    '& .MuiInputBase-root': {
      minHeight: "40px" 
    },
    '& .MuiSelect-root': {
      height: "40px",
      lineHeight: "40px"
    }
  },
  inputSmall: {
    '& .MuiInputBase-root': {
      minHeight: "32px"
    },
    '& .MuiSelect-root': {
      height: "32px",
      lineHeight: "32px"
    }
  },
  inputDisabled: {
    '& .MuiInputBase-root': {
      border:`1px solid ${disabledColor}`,
      background: disabledColor,
    },
    '& .MuiInputBase-root:hover': {
      border:`1px solid ${disabledColor}`,
    },
    '& .MuiSelect-root': {
      backgroundColor: disabledColor,
      color: "#676879"
    }
  },
  inputWithClear: {
    "& .MuiFilledInput-inputAdornedEnd": {
      padding: "0px 15px 0px 10px"
    }
  },
  helperText: {
    position: 'absolute',
    top: '100%',
    color: theme => `${theme.colors.error} !important`
  },
  clear: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    marginTop: '-12px',
    cursor: 'pointer',
    color: darkGrey
  },
  clearError: {
    color: theme => theme.colors.error 
  },
  validated: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    marginTop: '-12px',
    color: theme => theme.colors.success
  }
})
