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
    Divider,
    Box,
    SimpleGrid,
    Select
  } from '@chakra-ui/react'
import api from '../../services/api'
import { ISchemeProduct } from '../../interfaces/product-interface'
import { ISchemeCategory } from '../../interfaces/category-interface'

interface IProps {
    onAddProduct: (product: ISchemeProduct) => void;
}

const initProduct = {
    name: "",
    category_id: "",
    description: "",
    quantity: 0, 
    value: 0.00
}

const AddProduct: React.FunctionComponent<IProps> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [formValue, setFormValue] = useState(initProduct)
    const [categories, setCategories] = useState([])

    const listAllCategories = async () =>{
        const response = await api.get("/categories")
        return response.data
    }

    const addProduct = async () =>{
        console.log(formValue)
        const response = await api.post("/products", formValue)
        return response.data
    }

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        var product = await addProduct();
        props.onAddProduct(product);
        setFormValue(initProduct);
        onClose();
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    useEffect(() => {
        const listCategories = async () => {
            const categoriesFound = await listAllCategories()
            if(categoriesFound) setCategories(categoriesFound)
        }
        listCategories()
    }, [])

    return (
        <>
        <Box size='100%' align='left'><Button colorScheme='blue' onClick={onOpen}>Adicionar</Button></Box>
        
        <Divider align="right" p={3}/>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
            <form onSubmit={onFormSubmit}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Adicionar Produto</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>                
                    <SimpleGrid columns={1}>
                        <Box>
                            <FormControl>
                                <FormLabel>Nome</FormLabel>
                                <Input 
                                    type='text'
                                    placeholder='Nome' 
                                    value={formValue.name}
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
                                    value={formValue.description}
                                    onChange={onInputChange} 
                                    name='description'/>
                            </FormControl>
                        </Box>
                        <Box mt={4}>
                            <FormControl>
                                <FormLabel>Categoria</FormLabel>
                                <Select name='category_id' 
                                    value={formValue.category_id} 
                                    onChange={onSelectChange} placeholder='Seleciona uma Categoria'>
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
                                    value={formValue.quantity}
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
                                    value={formValue.value}
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
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
      </>
    )
}

export default AddProduct;