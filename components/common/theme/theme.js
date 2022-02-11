import { createTheme } from '@mui/material/styles'
export const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32',
      contrast: '#000000'
    },
    secondary: {
      main: '#000000',
      contrast: '#ffffff'
    }
  },
  typography: {
    fontSize: 12
  }
})