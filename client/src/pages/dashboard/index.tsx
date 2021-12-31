import {
    Box
  } from '@chakra-ui/react';

import Indicators from './indicators'
import ProductsSoldList from './products-sold-list'

export default function Dashboard (){
    return (
    <>
        <Box w='100%' p={4} pt={10}>
            <Indicators />
        </Box>
        <Box w='100%' p={4}>
            <Box w='100%' p={4} bg='white' borderRadius='10px'>
                <ProductsSoldList />
            </Box>
        </Box>
    </>
    )
}