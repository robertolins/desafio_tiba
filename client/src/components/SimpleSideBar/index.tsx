import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Icon,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react';
import { FiHome, FiPackage, FiLogOut, FiSettings} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';

interface LinkItemProps {
  name: string;
  icon: IconType;
  lnk: string;
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Dashboard', icon: FiHome, lnk: '/' },
    { name: 'Produtos', icon: FiPackage, lnk: '/products' },
    { name: 'Categorias', icon: FiSettings, lnk: '/categories' },
    { name: 'Sair', icon: FiLogOut, lnk: '/' },
];

export default function SimpleSidebar() {
  const { onClose } = useDisclosure();
  return (
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg='gray.800'
      borderRight="1px"
      borderRightColor='gray.200'
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color='white'>
          Logo
        </Text>
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} lnk={link.lnk}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  lnk: string,
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link to={rest.lnk} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        color="white"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'blue.500',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};