import React, {useState, useEffect} from 'react'
import {
    Box,
    Divider,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { ReactNode } from 'react';
  import { BsPerson } from 'react-icons/bs';
  import { FiBox, FiShoppingCart } from 'react-icons/fi';

  import api from '../../services/api'
  import formatMoney from '../../services/format-money'

const allStock = async () =>{
    const response = await api.get("/stocks")
    return response.data
}

const getAmountSales = async () =>{
  const response = await api.get("/sales/amount")
  return response.data
}

interface StatsCardProps {
    title: string;
    stat: string;
    subtitle: string;
    icon: ReactNode;
    bg: string;
}

const initStock = {
  total_stock: 0,
  quantity_products: 0
}

const initAmountSales = {
  total_amount: 0,
  total_quantity: 0
}

function StatsCard(props: StatsCardProps) {
    const { title, stat, subtitle, icon, bg } = props;
    return (
      <Stat
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'xl'}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={'lg'}>
        <Flex justifyContent={'space-between'}>
            <Box
                p='9px'
                width='60px'
                height='60px' 
                mt="-35px"
                bg={bg}
                borderRadius="10px"
                color={useColorModeValue('gray.800', 'gray.200')}
                alignContent={'center'}>
                {icon}
            </Box>
            <Box pl={{ base: 2, md: 4 }}>
              <StatLabel fontWeight={'medium'} color={'gray.400'} align={'right'}>
                {title}
              </StatLabel>
              <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                {stat}
              </StatNumber>
            </Box>
        </Flex>
        <Divider p={2}/>
        <Text fontSize='md' mt={3} color={'green.500'} align='left'>{subtitle}</Text>
      </Stat>
    );
  }

export default function Indicators (){
    const [stock, setStock] = useState(initStock)
    const [amountSales, setAmountSales] = useState(initAmountSales)

    useEffect(() => {
      const loadStock = async () => {
          const stockLoaded = await allStock()
          if(stockLoaded) setStock(stockLoaded)
      }

      const loadAmountSales = async () => {
        const amountSalesLoaded = await getAmountSales()
        if(amountSalesLoaded) setAmountSales(amountSalesLoaded)
    }

      loadStock()
      loadAmountSales()
    }, [])

    return (
        <SimpleGrid columns={4} spacing={10}>
            <Box bg='white' borderRadius='15px'>
                <StatsCard
                    title={'Estoque'}
                    stat={''+(Number(stock.total_stock))}  
                    subtitle={stock.quantity_products + ' Produto(s)'}     
                    bg={'gray.700'}                 
                    icon={<FiBox size={'2em'} color={"white"}/>}
                />
            </Box>
            <Box bg='white' borderRadius='15px'>
                <StatsCard
                    title={'Vendas'}
                    stat={'R$ '+ formatMoney.convert(amountSales.total_amount)}    
                    subtitle={amountSales.total_quantity + ' Venda(s)'}     
                    bg={'green.500'}                 
                    icon={<FiShoppingCart size={'2em'} color={"white"}/>}
                />
            </Box>
            <Box bg='white' borderRadius='15px'>
                <StatsCard
                    title={'Usuários'}
                    stat={'34'}     
                    subtitle={'+1% essa semana'}  
                    bg={'blue.400'}                 
                    icon={<BsPerson size={'2em'} color={"white"}/>}
                />
            </Box>
            <Box bg='white' borderRadius='15px'>
                <StatsCard
                    title={'Seguidores'}
                    stat={'+91'}     
                    subtitle={'Total esse ano'}    
                    bg={'pink.400'}                 
                    icon={<BsPerson size={'2em'} color={"white"}/>}
                />
            </Box>
        </SimpleGrid>
    )
}