import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import GlobalStyles from '../styles/GlobalStyles';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
