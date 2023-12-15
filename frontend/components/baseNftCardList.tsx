import React from 'react';
import { useState } from 'react';
import ShNftCard from './baseNftCard';
import useSWR from 'swr';
import { fetcher, baseUrl } from '../../services/baseSimpleHash';
import { ApiResponse } from '../../interfaces/zoraface';
import { 
  Box, 
  SimpleGrid,
  Button,
  Text
} from '@chakra-ui/react';

const BaseNftCardList = ({ startIndex = 0, columnCount = 3 }) => {
  const [animate, setAnimate] = useState(false);
  //const { data: shData, error } = useSWR<ApiResponse>(baseUrl, fetcher);
    const { data: shData, error, mutate } = useSWR<ApiResponse>(baseUrl, fetcher, {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
  });

    if (error) return <Box>Failed to load</Box>;
    if (!shData) return <Box>Loading...</Box>;

    // only 1155s
    //const filteredNfts = shData.transfers.filter(item => item.nft_details.contract.type === 'ERC1155');
    //const sortedNfts = filteredNfts.sort((a, b) => {
    const sortedNfts = shData.transfers.sort((a, b) => {
        const dateA = a.nft_details.created_date || '';
        const dateB = b.nft_details.created_date || '';
        return dateA.localeCompare(dateB);
    }).map((item, index) => ({ ...item, customIndex: index }));
    
    const itemCount = shData.transfers.length;

    // manually refresh
    const refreshData = () => {
      setAnimate(true); 
      mutate() 
        .then(() => {
          // data fetched
          setAnimate(false);
        })
        .catch(() => {
          // error things
          setAnimate(false); 
        });
    };

    const animationStyle = {
        animation: animate ? 'fadeIn 3s' : 'none'
    };

    // type count
    const typeCounts = shData.transfers.reduce(
      (acc, item) => {
        if (item.nft_details.contract.type === 'ERC1155') {
          acc.erc1155 += 1;
        } else if (item.nft_details.contract.type === 'ERC721') {
          acc.erc721 += 1;
        }
        return acc;
      },
      { erc1155: 0, erc721: 0 }
    );

    return (
      <Box>
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}
        </style>
        <Button onClick={refreshData} colorScheme="blue" my={4}>refresh SimpleHash results</Button>
        <Text my={2}><strong>erc1155 results: {typeCounts.erc1155}<br />erc721 results: {typeCounts.erc721}</strong></Text>
        <SimpleGrid style={animationStyle} columns={[1, columnCount, null, null]} spacing=".25rem">
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
                        type={nftItem.nft_details.contract.type}
                    />
                );
            })}
        </SimpleGrid>
      </Box>
    );
};

export default BaseNftCardList;
