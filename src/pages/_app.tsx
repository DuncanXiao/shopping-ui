import '../styles/globals.css'
import App, { AppProps, AppContext } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import { isMobile } from '@/utils/validate'
import CommonContext, { commonDefaultValues } from '@/contexts/common'
import { appWithTranslation } from 'next-i18next'
import Layout from '@/components/Layout'
import nextI18NextConfig from '../../next-i18next.config.js'
import theme from '../theme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

type TProps = AppProps & {
  common: any;
};

MyApp.getInitialProps = async (context: AppContext) => {
  const ctx = await App.getInitialProps(context);
  let mobile = false
  if (context.ctx.req) {
    mobile = isMobile(context.ctx.req.headers['user-agent'] || '')
  }

  return { ...ctx, common: { ...commonDefaultValues, isMobile: mobile } };
}

function MyApp({ Component, pageProps, common }: TProps) {
  return (
    <ThemeProvider theme={theme}>
      <CommonContext.Provider value={common}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CommonContext.Provider>
    </ThemeProvider>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
