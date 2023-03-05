import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/index.css";
import { GameProvider } from "../contexts/game";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GameProvider>
        <Head>
          <title>NextJS TailwindCSS TypeScript Starter</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </GameProvider>
    </>
  );
}

export default MyApp;
