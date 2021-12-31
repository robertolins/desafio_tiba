import React, {useState, useEffect} from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Box,
    SimpleGrid,
    FormControl,
    FormLabel,
    Input
  } from '@chakra-ui/react'

import { ISchemeProduct } from '../../interfaces/product-interface'
import api from '../../services/api'

interface IProps {
    product: ISchemeProduct
}

const AddSale: React.FunctionComponent<IProps> = (props) => {
    const initSale = {
        client: "",
        quantity: props.product.quantity
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [formValue, setFormValue] = useState(initSale)

    const addSale = async () =>{
        let product = {
            id: props.product.id,
            quantity: formValue.quantity
        }
        const data = {
            client: formValue.client,
            products: [product],
        }       
        const response = await api.post("/sales", data)
        return response
    }

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        var response = await addSale();
        if(response.status !== 200){
            props.product.quantity -= formValue.quantity
        }
        onClose();
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    useEffect(() => {
    }, [])

    return (
        <>
        <Button size='sm' colorScheme='green' onClick={onOpen}>Vender</Button>
        
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
        <form onSubmit={onFormSubmit}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Produto: {props.product.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <SimpleGrid columns={1}>
                    <Box>
                        <FormControl>
                            <FormLabel>Cliente</FormLabel>
                            <Input 
                                type='text'
                                placeholder='Nome' 
                                value={formValue.client}
                                onChange={onInputChange}
                                name='client'/>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel>Quantidade</FormLabel>
                            
                            <Input 
                                type='text'
                                placeholder='Quantidade' 
                                onChange={onInputChange}
                                name='quantity'/>
                        </FormControl>
                    </Box>   
                </SimpleGrid>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='blue' mr={3} type='submit'>
                    Confirmar
                </Button>
                <Button onClick={onClose}>Fechar</Button>
            </ModalFooter>
            </ModalContent>
        </form>
        </Modal>
      </>
    )
}

export default AddSale;