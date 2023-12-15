import HeaderNav from '../frontend/components/headerNav';
//import NftCardList from '../frontend/components/nftCardList';
import ShNftCardList from '../frontend/components/shNftCardList';
import ZpmNftCardList from '../frontend/components/zpmNftCardList';
import OpNftCardList from '../frontend/components/opNftCardList';
import BaseNftCardList from '../frontend/components/baseNftCardList';
import SolNftCardList from '../frontend/components/solNftCardList';
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
              <Tab>zora premint results</Tab>
              <Tab>zora transactions</Tab>
              <Tab>op transactions</Tab>
              <Tab>base transactions</Tab>
              <Tab>solana transactions</Tab>
              <Tab>todo: zk</Tab>
              <Tab>todo: frame</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box>
                  <Heading>50 latest zora premint results</Heading>
                  <ZpmNftCardList startIndex={0} columnCount={5}/>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box>
                  <Heading>50 latest zora transactions</Heading>
                  <Text>not filtered by token type. from the sales and transfers simplehash model</Text>
                  <ShNftCardList startIndex={0} columnCount={5}/>
                </Box>
              </TabPanel>
              <TabPanel>
                <Heading>50 latest op transactions</Heading>
                <Text>not filtered by token type. from the sales and transfers simplehash model</Text>
                <OpNftCardList startIndex={0} columnCount={5}/>
              </TabPanel>
              <TabPanel>
                <Heading>50 latest base transactions</Heading>
                <Text>not filtered by token type. from the sales and transfers simplehash model</Text>
                <BaseNftCardList startIndex={0} columnCount={5}/>
              </TabPanel>
              <TabPanel>
                <Heading>50 latest solana transactions</Heading>
                <Text>not filtered by token type. from the sales and transfers simplehash model</Text>
                <SolNftCardList startIndex={0} columnCount={5}/>
              </TabPanel>
              <TabPanel>
                <Heading>todo: zk results</Heading>
                <Text>not filtered by token type. from the sales and transfers simplehash model</Text>
              </TabPanel>
              <TabPanel>
                <Heading>todo: frame results</Heading>
                <Text>not filtered by token type. from the sales and transfers simplehash model</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </main>
      </Flex>
    </Box>
  );
};

export default Home;
