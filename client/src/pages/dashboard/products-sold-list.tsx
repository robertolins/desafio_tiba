import React, {useState, useEffect} from 'react'
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Progress,
    Heading
} from '@chakra-ui/react'

import api from '../../services/api'
import formatMoney from '../../services/format-money'
import MyAvatarGroup from './../../components/AvatarGroup'

const listProductsSolds = async () =>{
    const response = await api.get("/products/solds")
    return response.data
}

export default function ProductsSoldList (){
    const [productsSolds, setPrductsSolds] = useState([])

    useEffect(() => {
        const allProductsSolds = async () => {
            const products = await listProductsSolds()
            if(products) setPrductsSolds(products)
        }
        allProductsSolds()
    }, [])

    return (
    <>
        <Box w='100%' p={4} align='left'>
            <Heading as='h4' size='md'>
                Produtos Vendidos
            </Heading>
        </Box>
        <Box w='100%' p={4} >
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Produtos Vendidos</Th>
                        <Th>Clientes</Th>
                        <Th isNumeric>Valor</Th>
                        <Th>Total Estoque</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {typeof productsSolds !== "undefined" && productsSolds.map((product) => {
                        let totalSale: string;
                        totalSale = product['total_sale'];
                        const totalSaleNumber = Number(totalSale.replace('.',''))

                        const quantityStockNumber = Number(product['product']['quantity_stock'])

                        const rate = ((totalSaleNumber * 100) / (totalSaleNumber+quantityStockNumber))

                        return (<Tr key={product['product']['id']}>
                            <Td>{product['product']['name']}</Td>
                            <Td>
                                <MyAvatarGroup />
                            </Td>
                            <Td isNumeric>R$ {formatMoney.convert(product['amount'])}</Td>
                            <Td>
                                <Progress 
                                    colorScheme={(product['total_sale'] === product['product']['quantity_stock']) ? 'green' : 'blue'} 
                                    size='sm' 
                                    value={rate} />
                            </Td>
                        </Tr>)
                    })}
                </Tbody>
            </Table>
        </Box>
    </>
    )
}