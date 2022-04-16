import '../styles/globals.css'
import {RobinHoodProvider} from "../context/RobinHoodContext";
import {MoralisProvider} from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (

      <MoralisProvider
          serverUrl='https://6nenodjpth4x.usemoralis.com:2053/server'
          appId='Tz2pgw0rF0buSqCL9HGg9tYND6Yu7Ry0wyx37IeE'
      >
          <RobinHoodProvider>
              <Component {...pageProps} />
          </RobinHoodProvider>
      </MoralisProvider>
  )
}

export default MyApp
