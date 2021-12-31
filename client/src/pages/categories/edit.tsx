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
    SimpleGrid
  } from '@chakra-ui/react'
import api from '../../services/api'
import { ISchemeCategory } from '../../interfaces/category-interface'

interface IProps {
    category: ISchemeCategory;
    onEditCategory: (id:number, category: ISchemeCategory) => void;
}


const EditCategory: React.FunctionComponent<IProps> = (props) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [category, setCategory] = useState(props.category)

    useEffect(() => setCategory(props.category), [props]);

    const editCategory = async (id: number) =>{
        const response = await api.put("/categories/"+id, category)
        return response.data
    }

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const idEdit = props.category.id
        const categoryUpdated = await editCategory(idEdit);
        props.onEditCategory(idEdit, categoryUpdated);
        onClose();
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

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
                <ModalHeader>Editar Categoria</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>                
                    <SimpleGrid columns={1}>
                        <Box>
                            <FormControl>
                                <FormLabel>Nome</FormLabel>
                                <Input 
                                    type='text'
                                    placeholder='Nome' 
                                    value={category.name}
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
                                    value={category.description}
                                    onChange={onInputChange} 
                                    name='description'/>
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

export default EditCategory;