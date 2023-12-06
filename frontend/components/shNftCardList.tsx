import React from 'react';
import ShNftCard from './shNftCard';
import useSWR from 'swr';
import { fetcher, baseUrl } from '../../services/simpleHash';
import { ApiResponse } from '../../interfaces/zoraface';
import { 
  Box, 
  SimpleGrid,
  Button,
  Text
} from '@chakra-ui/react';

const ShNftCardList = ({ startIndex = 0, columnCount = 3 }) => {
    //const { data: shData, error } = useSWR<ApiResponse>(baseUrl, fetcher);
    const { data: shData, error, mutate } = useSWR<ApiResponse>(baseUrl, fetcher, {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
  });

    if (error) return <Box>Failed to load</Box>;
    if (!shData) return <Box>Loading...</Box>;

    const sortedNfts = shData.transfers.sort((a, b) => {
      const dateA = a.nft_details.created_date || '';
      const dateB = b.nft_details.created_date || '';
      return dateA.localeCompare(dateB);
    })
    .map((item, index) => ({ ...item, customIndex: index }));
    
    const itemCount = shData.transfers.length;

    // manually refresh
    const refreshData = () => {
      mutate();
    };

    return (
      <Box>
        <Button onClick={refreshData} colorScheme="blue" my={4}>Refresh Data</Button>
        <Text as='h2'>Card List Here</Text>
        <SimpleGrid columns={[1, columnCount, null, null]} spacing="2rem">
            {sortedNfts.slice(startIndex, startIndex + itemCount).map((nftItem) => {
                return (
                    <ShNftCard
                        key={nftItem.customIndex}
                        name={nftItem.nft_details.name}
                        description={nftItem.nft_details.description || 'null placeholder'}
                        image_url={nftItem.nft_details.image_url || '#null'}
                        external_url={nftItem.nft_details.external_url || '#null'}
                        contract_address={nftItem.contract_address}
                        token_id={nftItem.token_id}
                        owned_by={nftItem.nft_details.contract.owned_by}
                    />
                );
            })}
        </SimpleGrid>
      </Box>
    );
};

export default ShNftCardList;
