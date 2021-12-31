import React, {useState, useEffect} from 'react'
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Heading,
    Badge
} from '@chakra-ui/react'
import AddProduct from './add'
import EditProduct from './edit'
import ViewProduct from './view'
import AddSale from '../sales/add'
import api from '../../services/api'
import { ISchemeProduct } from '../../interfaces/product-interface'
import moment from 'moment'

const listAllProducts = async () =>{
    const response = await api.get("/products")
    return response.data
}

const defaultProducts: Array<ISchemeProduct> = [];

export default function ListProducts () {
    const [products, setProducts] = useState(defaultProducts)
    const [editing, setEdit] = useState(false);

    const onAddProduct = (newProduct: ISchemeProduct) => {
        setProducts([...products, { ...newProduct}])
    };

    const onEditProduct = (id: number, editProduct: ISchemeProduct) => {
        setEdit(false)
        setProducts(products.map(i => (i.id === id ? editProduct : i)));
    };

    const onDeleteProduct = async (currentProduct: ISchemeProduct) => {
        const removed = await removeProduct(currentProduct.id)

        if(removed)
            setProducts(products.filter(i => i.id !== currentProduct.id));
    };

    const removeProduct = async (id: number) =>{
        const response = await api.delete("/products/"+id)
        if(response.status !== 204) return false 
        return true
    }

    useEffect(() => {
        const allProducts = async () => {
            const productsFound = await listAllProducts()
            if(productsFound) setProducts(productsFound)
        }
        allProducts()
    }, [])
    
    return (
        <Box w='100%' p={4}>
            <AddProduct onAddProduct={onAddProduct}/>
            <Box w='100%' p={4} bg='white' borderRadius='10px'>
                <Box w='100%' p={4} align='left'>
                    <Heading as='h4' size='md'>
                        Produtos
                    </Heading>
                </Box>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Produtos</Th>
                            <Th>Categoria</Th>
                            <Th>Status</Th>
                            <Th>Cadastro Em</Th>
                            <Th>Ação</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {typeof products !== "undefined" && products.map((product) => {
                            return (<Tr key={product['id']}>
                                <Td><ViewProduct product={product} /></Td>
                                <Td>{(product['category'] !== undefined && product['category'] != null) ? product['category']['name'] : '--'}</Td>
                                <Td>
                                    <Badge variant='solid' colorScheme={(product['active']) ? 'green' : 'red'}>
                                        {(product['active']) ? 'Ativo' : 'Inativo'}
                                    </Badge>
                                </Td>
                                <Td>{ moment(product['created_at']).format("DD/MM/yyyy HH:mm")}</Td>
                                <Td>
                                    <AddSale product={product}/>
                                    <EditProduct onEditProduct={onEditProduct} product={product}/>
                                    <Button 
                                        onClick={() => onDeleteProduct(product)}
                                        size='sm' 
                                        colorScheme='red' 
                                        color='white'
                                    >
                                            Excluir
                                    </Button>
                                </Td>
                            </Tr>)
                        })}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    )
}