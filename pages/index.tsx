import HeaderNav from '../frontend/components/headerNav';
//import NftCardList from '../frontend/components/nftCardList';
import ShNftCardList from '../frontend/components/shNftCardList';
import ZpmNftCardList from '../frontend/components/zpmNftCardList';
//import ConnectButtonCustom from '../frontend/components/connectButtonCustom';
import type { NextPage } from 'next';
import Head from 'next/head';
import { 
  Flex,
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <Box backgroundColor='gray.50'>
      <Head>
        <title>zora poster wall experiment</title>
        <meta content="things here" name="more things here"/>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <HeaderNav />

      <Flex justifyContent='center' p={1}>
        <main>
          <Tabs variant='enclosed' mt={6}>
            <TabList>
              <Tab>premint results</Tab>
              <Tab>SimpleHash results</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box>
                  <Heading>50 latest premint results</Heading>
                  <ZpmNftCardList startIndex={0} columnCount={5}/>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box>
                  <Heading>50 latest SimpleHash results</Heading>
                  <Text>not filtered by token type. from the sales and transfers simplehash model</Text>
                  <ShNftCardList startIndex={0} columnCount={5}/>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </main>
      </Flex>
    </Box>
  );
};

export default Home;
