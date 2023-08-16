import { useMemo, useContext } from "react";
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Login from '@/components/Login'

import styles from './index.module.scss'

export default function LoginPage() {
  const router = useRouter()
  const { t } = useTranslation('common')
  return (
    <div>
      <div className={styles.container}>
        <Login />
      </div>
    </div>
  )
}

export const getStaticProps = async ({ locale }: any) => {
  const props = await serverSideTranslations(locale, ['common'])
  return {
    props,
    // if using the approach with the live translation download, meaning using i18next-locize-backend on server side,
    // there is a reloadInterval for i18next-locize-backend that can be used to reload resources in a specific interval: https://github.com/locize/i18next-locize-backend#backend-options
    // doing so it is suggested to also use the revalidate option, here:
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every hour
    // revalidate: 60 * 60, // in seconds
  }
}
