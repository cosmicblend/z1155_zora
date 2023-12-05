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

interface ShNftCardProps {
    name: string;
    description: string | null;
    image_url: string;
    external_url: string | null;
    contract_address: string;
    token_id: string;
    owned_by: string;
}

const ShNftCard: React.FC<ShNftCardProps> = ({
    name,
    description,
    image_url,
    external_url,
    contract_address,
    token_id,
    owned_by
}) => { 

    return (
    <Card variant="filled" height='auto' p={['1', '1']} >
    <CardBody>
        <Image src={image_url} alt={name} mb={4}/>
        <Stack>
            <Heading as='h3'>{name}</Heading>
            <Heading as='h4'>By: <Link href={external_url || '#'} isExternal textDecoration='underline'>{owned_by}</Link></Heading>
            <Text my={2}>{description || ''}</Text>
        </Stack>
        <Stack my={2}>
            <MintButton contractAddress={contract_address} tokenId={token_id} />
        </Stack>
        <Stack mt={8} align="center" direction='row'>
            {/* todo: links for zora and explorer */}
            <Link href='' isExternal>
                <Button>ON ZORA</Button>
            </Link>
            <Link href='' isExternal>
                <Button>ON EXPLORER</Button>
            </Link>
        </Stack>
    </CardBody>
</Card>
);

};
  
export default ShNftCard;