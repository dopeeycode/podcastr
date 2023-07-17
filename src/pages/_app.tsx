import '@/styles/globals.scss'

import { Header } from '@/components/Header'
import type { AppProps } from 'next/app'

import styles from '../styles/app.module.scss'
import Player from '@/components/Player'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.appWrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  )
}
