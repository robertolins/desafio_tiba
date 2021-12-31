import React from 'react';
import { Link } from 'react-router-dom';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
  } from '@chakra-ui/react'

class MyBreadcrumb extends React.Component {
    render() {
        return (
            <Breadcrumb fontWeight='medium' fontSize='sm' color='gray.500' align='left'>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to='/'>Dashboard</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to='/produtos'>Produtos</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        )
    }
}

export default MyBreadcrumb;