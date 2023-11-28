//import { ConnectButton } from '@rainbow-me/rainbowkit';
import HeaderNav from '../frontend/components/headerNav';
import ConnectButtonCustom from '../frontend/components/connectButtonCustom';
import type { NextPage } from 'next';
import Head from 'next/head';
import { 
  Flex,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <Box
      backgroundColor='gray.50'
      borderWidth='0.5rem' 
      borderColor='pink.100' 
    >
      <Head>
        <title>RainbowKit App</title>
        <meta content="things here" name="more things here"/>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <HeaderNav />

      <Flex justifyContent='center' p={4}>
        <main>
          <Heading>RainbowKit, wagmi, next, chakra, zora js sdk</Heading>
          <ConnectButtonCustom />
        </main>
      </Flex>
    </Box>
  );
};

export default Home;
