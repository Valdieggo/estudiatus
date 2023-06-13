import { ChakraProvider } from '@chakra-ui/react'
import {extendTheme} from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
  post: {
    200: "#19304e", // hover
    100: "#18273f", // active
  }, 
  button: {
    200: "#22c2f5", // hover
    100: "#2d6bb7", // active
  },
  bg: {
    100: "#151f32",
  }
}

const theme = extendTheme({ colors })

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp; 