import '../styles/globals.css'
import '../styles/winenft.css'
import Base from '../layout/base'
function MyApp({ Component, pageProps }) {
  return <Base>
    <Component {...pageProps} />
  </Base>
}

export default MyApp
