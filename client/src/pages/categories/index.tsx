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
import AddCategory from './add'
import EditCategory from './edit'
import api from '../../services/api'
import { ISchemeCategory } from '../../interfaces/category-interface'
import moment from 'moment'

const listAllCategories = async () =>{
    const response = await api.get("/categories")
    return response.data
}

const defaultCategories: Array<ISchemeCategory> = [];

export default function ListCategories () {
    const [categories, setCategories] = useState(defaultCategories)
    const [editing, setEdit] = useState(false);

    const onAddCategory = (newCategory: ISchemeCategory) => {
        setCategories([...categories, { ...newCategory }])
    };

    const onEditCategory = (id: number, editCategory: ISchemeCategory) => {
        setEdit(false)
        setCategories(categories.map(i => (i.id === id ? editCategory : i)));
    };

    const onDeleteCategory = async (currentCategory: ISchemeCategory) => {
        const removed = await removeCategory(currentCategory.id)

        if(removed)
            setCategories(categories.filter(i => i.id !== currentCategory.id));
    };

    const removeCategory = async (id: number) =>{
        const response = await api.delete("/categories/"+id)
        if(response.status !== 204) return false 
        return true
    }

    useEffect(() => {
        const allCategories = async () => {
            const categoriesFound = await listAllCategories()
            if(categoriesFound) setCategories(categoriesFound)
        }
        allCategories()
    }, [])
    
    return (
        <Box w='100%' p={4}>
            <AddCategory onAddCategory={onAddCategory}/>
            <Box w='100%' p={4} bg='white' borderRadius='10px'>
                <Box w='100%' p={4} align='left'>
                    <Heading as='h4' size='md'>
                        Categorias
                    </Heading>
                </Box>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Categoria</Th>
                            <Th>Descrição</Th>
                            <Th>Status</Th>
                            <Th>Cadastro Em</Th>
                            <Th>Ação</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {typeof categories !== "undefined" && categories.map((category) => {
                            return (<Tr key={category['id']}>
                                <Td>{category['name']}</Td>
                                <Td>{category['description']}</Td>
                                <Td>
                                    <Badge variant='solid' colorScheme={(category['status']) ? 'green' : 'red'}>
                                        {(category['status']) ? 'Ativo' : 'Inativo'}
                                    </Badge>
                                </Td>
                                <Td>{ moment(category['created_at']).format("DD/MM/yyyy HH:mm")}</Td>
                                <Td>
                                    <EditCategory onEditCategory={onEditCategory} category={category}/>
                                    <Button 
                                        onClick={() => onDeleteCategory(category)}
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