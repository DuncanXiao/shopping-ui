import '../styles/globals.css'
import App, { AppProps, AppContext } from 'next/app'
import { createContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { isMobile } from '@/utils/validate'
import CommonContext from '@/contexts/common'
import theme from '../theme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

type TProps = Pick<AppProps, "Component" | "pageProps"> & {
  common: any;
};

MyApp.getInitialProps = async (context: AppContext) => {
  const ctx = await App.getInitialProps(context);
  let mobile = false
  if (context.ctx.req) {
    mobile = isMobile(context.ctx.req.headers['user-agent'] || '')
  }

  return { ...ctx, common: { isMobile: mobile } };
}

function MyApp({ Component, pageProps, common }: TProps) {
  console.log('----', common)
  return (
    <ThemeProvider theme={theme}>
      <CommonContext.Provider value={common}>
        <Component {...pageProps} />
      </CommonContext.Provider>
    </ThemeProvider>
  )
}



export default MyApp
