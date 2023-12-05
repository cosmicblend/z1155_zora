import HeaderNav from '../frontend/components/headerNav';
//import NftCardList from '../frontend/components/nftCardList';
import ShNftCardList from '../frontend/components/shNftCardList';
//import ConnectButtonCustom from '../frontend/components/connectButtonCustom';
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

      <Flex justifyContent='center' p={1}>
        <main>
          <Heading>RainbowKit, wagmi, next, chakra, zora js sdk</Heading>

          <Box>
            <ShNftCardList startIndex={0} columnCount={3}/>
          </Box>
        </main>
      </Flex>
    </Box>
  );
};

export default Home;
