import React, { useState, useEffect } from 'react';
import ConnectButtonCustom from './connectButtonCustom';
import { 
    Flex, 
    Box,
    Heading,
    Text, 
    Button
} from '@chakra-ui/react';

const HeaderNav = () => {

    return (
        <Flex
            justifyContent='space-between'
            position='sticky'
            top='0'
            zIndex='10'
            backgroundColor='#ffffff'
            boxShadow='md'
            p={4}
        >
            <Box>
                <Heading>brandHere</Heading>
            </Box>
            <Box>
                <ConnectButtonCustom />
            </Box>
        </Flex>
    );
};

export default HeaderNav;