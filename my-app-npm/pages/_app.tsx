import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { initializeApp } from 'firebase/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
