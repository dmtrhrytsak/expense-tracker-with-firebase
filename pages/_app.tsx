import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store/rootReducer';

import { AuthContextProvider } from '../contexts/authContext';
import { Layout } from '../components/Shared';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </Provider>
  );
}

export default MyApp;
