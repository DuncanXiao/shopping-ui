import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Header from '@/components/Header'
import styles from './index.module.scss'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <div className={styles.main}>
      {children}
    </div>
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
)

export default Layout