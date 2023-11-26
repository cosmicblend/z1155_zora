import { ConnectButton } from '@rainbow-me/rainbowkit';
import ConnectButtonCustom from '../frontend/components/connectButtonCustom';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>RainbowKit App</title>
        <meta content="things here" name="more things here"/>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main>
        <h1>RainbowKit, wagmi, next, chakra, zora js sdk</h1>
        <ConnectButtonCustom />
      </main>

      <footer>
        <p>footer things</p>
      </footer>
    </div>
  );
};

export default Home;
