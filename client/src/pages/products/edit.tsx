import React, {useState, useEffect} from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    useDisclosure,
    Box,
    SimpleGrid,
    Select
  } from '@chakra-ui/react'
import api from '../../services/api'
import { ISchemeProduct } from '../../interfaces/product-interface'
import { ISchemeCategory } from '../../interfaces/category-interface'

interface IProps {
    product: ISchemeProduct;
    onEditProduct: (id: number, product: ISchemeProduct) => void;
}

const listAllCategories = async () =>{
    const response = await api.get("/categories")
    return response.data
}

const EditProduct: React.FunctionComponent<IProps> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [product, setProduct] = useState(props.product)
    const [categories, setCategories] = useState([])

    const editProduct = async (id: number) =>{
        const response = await api.put("/products/"+id, product)
        return response.data
    }

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const idEdit = props.product.id
        var productUpdated = await editProduct(idEdit);
        props.onEditProduct(idEdit, productUpdated);
        onClose();
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    useEffect(() => {
        setProduct(props.product)

        const listCategories = async () => {
            const categoriesFound = await listAllCategories()
            if(categoriesFound) setCategories(categoriesFound)
        }
        listCategories()
    }, [])

    return (
        <>
        <Button size='sm' colorScheme='yellow' color='white' onClick={onOpen}>Editar</Button>
        
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={onFormSubmit}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Editar Produto</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>                
                    <SimpleGrid columns={1}>
                        <Box>
                            <FormControl>
                                <FormLabel>Nome</FormLabel>
                                <Input 
                                    type='text'
                                    placeholder='Nome' 
                                    value={product.name}
                                    onChange={onInputChange}
                                    name='name'/>
                            </FormControl>
                        </Box>
                        <Box mt={4}>
                            <FormControl>
                                <FormLabel>Descrição</FormLabel>
                                <Input 
                                    type='text'
                                    placeholder='Descrição'
                                    value={product.description}
                                    onChange={onInputChange} 
                                    name='description'/>
                            </FormControl>
                        </Box>
                        <Box mt={4}>
                            <FormControl>
                                <FormLabel>Categoria</FormLabel>
                                <Select name='category_id' 
                                    value={product.category_id} 
                                    onChange={onSelectChange} >
                                    {typeof categories !== "undefined" && categories.map((category: ISchemeCategory) => {
                                        return (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                    </SimpleGrid>
                    <SimpleGrid columns={2} mt={4} spacing={10}>
                        <Box>
                            <FormControl>
                                <FormLabel>Quantidade</FormLabel>
                                <Input 
                                    type='number'
                                    placeholder='Quantidade' 
                                    value={product.quantity}
                                    onChange={onInputChange}
                                    name='quantity'/>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormLabel>Preço</FormLabel>
                                <Input 
                                    type='text'
                                    placeholder='Preço' 
                                    value={product.value}
                                    onChange={onInputChange}
                                    name='value'/>
                            </FormControl>
                        </Box>
                    </SimpleGrid>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} type='submit'>
                        Salvar
                    </Button>
                    <Button onClick={onClose}>Cancelar</Button>
                </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
      </>
    )
}

export default EditProduct;