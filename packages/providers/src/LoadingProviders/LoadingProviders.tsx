import { Loading } from '@komune-io/g2-components'
import { useTheme } from '@komune-io/g2-themes'
import { Box } from '@mui/material'

export const LoadingProviders = () => {
  const theme = useTheme()
  return (
    <Loading
      icon={
        theme.logoUrl ? (
          <img
            src={theme.logoUrl}
            style={{
              width: '80vw',
              maxWidth: '250px',
              maxHeight: '80vh',
              marginBottom: '20px'
            }}
            alt='The application logo'
          />
        ) : (
          <Box
            sx={{
              width: '80vw',
              maxWidth: '250px',
              height: '80vh',
              maxHeight: '250px'
            }}
          />
        )
      }
    />
  )
}
