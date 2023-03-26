import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/index.css";
import { GameProvider } from "../contexts/GameContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GameProvider>
        <Head>
          <title>Moderator Helper</title>
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
