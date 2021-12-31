import React from 'react';
import {BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider, Box, theme } from '@chakra-ui/react'
import SimpleSidebar from './components/SimpleSideBar';
import MyBreadcrumb from './components/Breadcrumb';
import Rotas from './routes'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" textAlign="center" fontSize="xl" bg="gray.200">
      <Router>
        <SimpleSidebar />
        <Box ml={{ base: 0, md: 60 }} p="4">
          <MyBreadcrumb></MyBreadcrumb>
          <Rotas />
        </Box>
      </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;
