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

interface ZpmNftCardProps {
    name: string | null;
    description: string | null;
    collection_image: string;
    contract_address: string;
    creator_address: string;
    token_id: string;
    activeState: boolean;
    collection_duration: string;
    mint_start: string;
    contractAdmin: string;
}

const ZpmNftCard: React.FC<ZpmNftCardProps> = ({
    name,
    description,
    collection_image, //data-testid="media-renderer"
    contract_address,
    creator_address,
    token_id,
    activeState,
    collection_duration,
    mint_start,
    contractAdmin
}) => { 

    return (
    <Card variant="filled" height='auto' p={['1', '1']} fontSize='sm'>
    <CardBody>
        <Stack>
            <Text>
                <strong>collection name:</strong><br />
                {name}
            </Text>
            <Text>
                <strong>token id:</strong><br />
                {token_id}
            </Text>
            {/*<Text>
                <strong>collection address:</strong><br />
                {contract_address}
            </Text>
            <Text>
                <strong>creator address:</strong><br />
                {creator_address}
            </Text>*/}
            <Text>
                <strong>mint start:</strong><br /> 
                {
                    Math.floor((Date.now() / 1000 - parseInt(mint_start)) / 86400) > 0 
                    ? `${Math.floor((Date.now() / 1000 - parseInt(mint_start)) / 86400)} days ago`
                    : 'Today'
                }
            </Text>
            <Text>
                <strong>duration:</strong><br /> 
                {Math.floor((Math.floor(Date.now() / 1000) - parseInt(collection_duration)) / 86400)} days
            </Text>
            <Button fontSize='sm' colorScheme='pink'>
                <Link href={`https://zora.co/collect/zora:${contract_address}/${token_id}`}>premint zora page</Link>
            </Button>
        </Stack>
        <Text mt={2}><strong>todo:</strong><br />image scrape off zora</Text>
        {/*<Image src={collection_image} alt={name || 'nothing yet'} mb={4}/>*/}
        <Stack mt={6}>
            {/*<Text>mint button placeholder</Text>*/}
        </Stack>
        {/*<Stack mt={8} align="center" direction='row'>*/}
            {/* todo: links for zora and explorer */}
        {/*</Stack>*/}
    </CardBody>
</Card>
);

};
  
export default ZpmNftCard;