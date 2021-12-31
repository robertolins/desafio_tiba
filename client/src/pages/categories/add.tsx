import React, {useState} from 'react';
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
    SimpleGrid
  } from '@chakra-ui/react'
import api from '../../services/api'
import { ISchemeCategory } from '../../interfaces/category-interface'

interface IProps {
    onAddCategory: (user: ISchemeCategory) => void;
}

const initCategory = {
    name: "",
    description: ""
}

const AddCategory: React.FunctionComponent<IProps> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [formValue, setFormValue] = useState(initCategory)
    
    const initialRef = React.useRef()
    const finalRef = React.useRef()

    const addCategory = async () =>{
        const response = await api.post("/categories", formValue)
        return response.data
    }

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        var category = await addCategory();
        props.onAddCategory(category);
        setFormValue(initCategory);
        onClose();
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

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
                <ModalHeader>Adicionar Categoria</ModalHeader>
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

export default AddCategory;