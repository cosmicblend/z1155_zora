import React from 'react';
import NftCard from './nftCard';
import nftData from '../../data/nftdata.json'; 
import { 
    SimpleGrid
} from '@chakra-ui/react';

const NftCardList = ({ 
  startIndex = 0, 
  itemCount = nftData.length,
  columnCount = 3
}) => {
  const sortedNfts = nftData.sort((a, b) => a.id - b.id);

  return (
    <SimpleGrid columns={[1, columnCount, null, null]} spacing="2rem">
      {sortedNfts.slice(startIndex, startIndex + itemCount).map((nftItem, index) => (
        <NftCard
          key={index}
          nftTitle={nftItem.nftTitle}
          authorName={nftItem.authorName}
          imageUrl={nftItem.imageUrl}
          description={nftItem.description}
          contractAddress={nftItem.contractAddress}
          tokenID={nftItem.tokenID}
          id={nftItem.id.toString()}
          projectLink={nftItem.projectLink}
          zoraLink={nftItem.zoraLink}
          explorerLink={nftItem.explorerLink}
        />
      ))}
    </SimpleGrid>
  );
};

export default NftCardList;
