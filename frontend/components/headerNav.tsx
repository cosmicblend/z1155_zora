import React, { useState, useEffect } from 'react';
import ConnectButtonCustom from './connectButtonCustom';
import { 
    Flex, 
    Box,
    Text, 
} from '@chakra-ui/react';

const HeaderNav = () => {

    return (
        <Flex
            justifyContent='space-between'
            position='sticky'
            top='0'
            zIndex='10'
            boxShadow="md"
            //alignItems='center'
        >
            <Box borderWidth='1px' borderColor='#000'>
                <Text>nameHere</Text>
            </Box>
            <Box borderWidth='1px' borderColor='#000'>
                <ConnectButtonCustom />
            </Box>
        </Flex>
    );
};

export default HeaderNav;