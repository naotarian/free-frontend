import '../styles/globals.css'
import '../styles/parts.css'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import {theme} from '../components/common/theme/theme'
import { ThemeProvider } from '@mui/material/styles'
import { Provider } from "react-redux"
import store from "../redux/store"
import { CookiesProvider } from "react-cookie"

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </CookiesProvider>
  )
}

export default MyApp
