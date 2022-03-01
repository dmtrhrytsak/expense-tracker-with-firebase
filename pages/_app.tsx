import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store/rootReducer';

import { Container, Navbar } from '../components/Shared';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Navbar />
      <main className="min-h-screen py-8 bg-gray-100">
        <Container>
          <Component {...pageProps} />
        </Container>
      </main>
    </Provider>
  );
}

export default MyApp;
