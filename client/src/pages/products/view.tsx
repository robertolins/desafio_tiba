import React from 'react';
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
    Link,
    Stack,
    Heading,
    Text
  } from '@chakra-ui/react'

import { ISchemeProduct } from '../../interfaces/product-interface'
import formatMoney from '../../services/format-money'

interface IProps {
    product: ISchemeProduct;
}

const ViewProduct: React.FunctionComponent<IProps> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
        <Link color='teal.500' onClick={onOpen}>{props.product.name}</Link>
        
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Produto</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <Stack spacing={0} align={'center'} mb={5}>
                    <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                        {props.product.name}
                    </Heading>
                    <Text color={'gray.500'}>{props.product.description}</Text>
                </Stack>

                <Stack direction={'row'} justify={'center'} spacing={6}>
                    <Stack spacing={0} align={'center'}>
                        <Text fontWeight={600}>{props.product.quantity}</Text>
                        <Text fontSize={'sm'} color={'gray.500'}>
                            Estoque
                        </Text>
                    </Stack>
                    <Stack spacing={0} align={'center'}>
                        <Text fontWeight={600}>{'R$ '+ formatMoney.convert(props.product.value)}</Text>
                        <Text fontSize={'sm'} color={'gray.500'}>
                            Preço
                        </Text>
                    </Stack>
                </Stack>
            </ModalBody>
            <ModalFooter>
                <Button onClick={onClose}>Fechar</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
      </>
    )
}

export default ViewProduct;