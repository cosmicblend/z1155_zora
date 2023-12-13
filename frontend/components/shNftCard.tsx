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
    type: string;
}

const ShNftCard: React.FC<ShNftCardProps> = ({
    name,
    description,
    image_url,
    external_url,
    contract_address,
    token_id,
    owned_by,
    type
}) => { 

    return (
    <Card variant="filled" height='auto'>
    <CardBody>
        <Image src={image_url} alt={name} mb={4}/>
        <Stack>
            <Text>
                <strong>contract type:</strong><br />
                {type}
            </Text>
            <Text>
                <strong>name:</strong><br />
                {name}
            </Text>
        </Stack>
        <Stack align="center" direction='row'>
            {/* todo: links for zora and explorer */}
        </Stack>
    </CardBody>
</Card>
);

};
  
export default ShNftCard;