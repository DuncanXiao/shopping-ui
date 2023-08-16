import '../styles/globals.css'
import App, { AppProps, AppContext } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import { isMobile } from '@/utils/validate'
import CommonContext, { commonDefaultValues } from '@/contexts/common'
import { appWithTranslation } from 'next-i18next'
import Layout from '@/components/Layout'
import { wrapper } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import * as services from "@/services";
import navigateSlice from "@/store/navigateSlice";

import nextI18NextConfig from '../../next-i18next.config.js'
import theme from '../theme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

type TProps = AppProps & {
  common: any;
};

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async (context) => {
  const ctx = await App.getInitialProps(context);
  let mobile = false
  if (context.ctx.req) {
    mobile = isMobile(context.ctx.req.headers['user-agent'] || '')
  }
  const res = await services.getCategory()
  store.dispatch(navigateSlice.actions.setNavigate(res.data))
  return { ...ctx, common: { ...commonDefaultValues, isMobile: mobile } };
})

function MyApp({ Component, pageProps, common }: TProps) {
  const { store, props }: any = wrapper.useWrappedStore(pageProps);
  return (
    <ThemeProvider theme={theme}>
      <CommonContext.Provider value={common}>
      <Provider store={store}>
        <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
          <Layout>
            <Component {...props.pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
      </CommonContext.Provider>
    </ThemeProvider>
  )
}

export default appWithTranslation((MyApp), nextI18NextConfig)
