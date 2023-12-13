import React from 'react';
//import ShNftCard from './shNftCard';
import ZpmNftCard from './zpmNftCard';
import useSWR from 'swr';
import { premintFetcher, premintBaseUrl } from '../../services/premintapi';
import { PremintApiResponse } from '../../interfaces/premint';
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

    if (error) return <Box>Failed to load</Box>;
    if (!shData) return <Box>Loading...</Box>;

    const sortedNfts = shData.data.sort((a, b) => {
        const dateA = a.start_datetime || '';
        const dateB = b.start_datetime || '';
        return dateA.localeCompare(dateB);
    }).map((item, index) => ({ ...item, customIndex: index }));
    
    const itemCount = shData.data.length;

    // manually refresh
    const refreshData = () => {
      mutate();
    };

    return (
      <Box>
        {/*<Button onClick={refreshData} colorScheme="blue" my={4}>Refresh Data</Button>*/}
        <SimpleGrid columns={[1, columnCount, null, null]} spacing=".25rem">
            {sortedNfts.slice(startIndex, startIndex + itemCount).map((PremintNftItem) => {
                return (
                    <ZpmNftCard
                        key={PremintNftItem.customIndex}
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
