import React, { useState, useEffect } from 'react';
import ZpmNftCard from './zpmNftCard';
import useSWR from 'swr';
import { premintFetcher, premintBaseUrl } from '../../services/premintapi';
import { PremintApiResponse, PremintNftItem } from '../../interfaces/premint';
import { 
  Box, 
  SimpleGrid,
  Button
} from '@chakra-ui/react';

const ZpmNftCardList = ({ startIndex = 0, columnCount = 3 }) => {
    //const { data: shData, error } = useSWR<PreminApiResponse>(premintBaseUrl, premintFetcher);
    const { data: shData, error, mutate } = useSWR<PremintApiResponse>(premintBaseUrl, premintFetcher, {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
  });

  const [filteredNfts, setFilteredNfts] = useState<PremintNftItem[]>([]);

  useEffect(() => {
      if (shData) {
          filterNFTsWithRedirects(shData.data);
      }
  }, [shData]);

  if (error) return <Box>Failed to load</Box>;
  if (!shData) return <Box>Loading...</Box>;

  const currentTime = Math.floor(Date.now() / 1000); 

  const checkRedirect = async (url: string) => {
    const response = await fetch(`/api/services/checkRedirect?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return !data.isRedirect;
  }; 

  const filterNFTsWithRedirects = async (nfts: PremintNftItem[]) => {
    //const checks = nfts.map(nft => checkRedirect(nft.collection.image || ''));
    const checks = nfts.map((nft: PremintNftItem) => checkRedirect(nft.collection.image || ''));
    const results = await Promise.all(checks);
    //const filtered = nfts.filter((_, index) => results[index]);
    const filtered = nfts.filter((_, index: number) => results[index]);
    setFilteredNfts(filtered);
  };

  const sortedAndFilteredNfts = filteredNfts.sort((a, b) => {
    const mintStartA = parseInt(a.mint_context.premint.tokenConfig.mintStart) || 0;
    const mintStartB = parseInt(b.mint_context.premint.tokenConfig.mintStart) || 0;

    const differenceA = currentTime - mintStartA;
    const differenceB = currentTime - mintStartB;

    return differenceA - differenceB;
  });

  const itemCount = sortedAndFilteredNfts.length;

  // manually refresh
  //const refreshData = () => {
  //  mutate();
  //};

    return (
      <Box>
        {/*<Button onClick={refreshData} colorScheme="blue" my={4}>Refresh Data</Button>*/}
        <SimpleGrid columns={[1, columnCount, null, null]} spacing=".25rem">
            {sortedAndFilteredNfts.slice(startIndex, startIndex + itemCount).map((PremintNftItem, index) => {
                return (
                    <ZpmNftCard
                        key={index}
                        name={PremintNftItem.collection.name}
                        description={PremintNftItem.collection.description || 'no description yet'}
                        collection_image={PremintNftItem.collection.image || '#null'}
                        collection_duration={PremintNftItem.mint_context.premint.tokenConfig.mintDuration || '#null'}
                        contract_address={PremintNftItem.contract_address}
                        creator_address={PremintNftItem.creator_address}
                        token_id={PremintNftItem.token_id}
                        contractAdmin={PremintNftItem.mint_context.collection.contractAdmin}
                        activeState={PremintNftItem.is_active}
                        mint_start={PremintNftItem.mint_context.premint.tokenConfig.mintStart || '#null'}
                    />
                );
            })}
        </SimpleGrid>
      </Box>
    );
};

export default ZpmNftCardList;
