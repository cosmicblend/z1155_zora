import React from 'react';
import MintButton from './mintButton';
import { 
    Image,
    Stack,
    Heading,
    Text,
    Button,
    Card,
    CardBody, 
    Link
  } from '@chakra-ui/react';

interface NftCardProps {
    nftTitle: string;
    authorName: string;
    imageUrl: string;
    description: string;
    contractAddress: string;
    tokenID: string;  
    id: string;
    projectLink: string;
    zoraLink: string;
    explorerLink: string;
}

  const NftCard: React.FC<NftCardProps> = ({ 
    nftTitle, 
    authorName, 
    imageUrl, 
    description,
    contractAddress,
    tokenID,
    id,
    projectLink,
    zoraLink,
    explorerLink
 }) => {
    return <Card variant="filled" p={['2', '8']} >
  
    <CardBody>
      <Image src={imageUrl} alt={nftTitle} mb={4}/>
      <Stack>
        <Heading as='h3'>{nftTitle}</Heading>
        <Heading as='h4'>By: <Link href={projectLink} isExternal textDecoration='underline'>{authorName}</Link></Heading>
        <Text my={2}>{description}</Text>
      </Stack>
      <Stack my={2}>
        <MintButton contractAddress={contractAddress} tokenId={tokenID} />
      </Stack>
      <Stack mt={8} align="center" direction='row'>
        <Link href={zoraLink} isExternal>
          <Button>ON ZORA</Button>
        </Link>
        <Link href={explorerLink} isExternal>
          <Button>ON EXPLORER</Button>
        </Link>
      </Stack>
    </CardBody>
  </Card>

  };
  
  export default NftCard;