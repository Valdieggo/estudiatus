import {
  Flex,
  Box,
  Link,
} from "@chakra-ui/react";
import User from "./User";

export default function Navbar() {
  return (
    <Flex maxW="100%" p="4" justifyContent="space-between" zIndex="10">
      <Box />

      <Box>
        <Link px="4" href="/">
          Foro
        </Link>
        <Link px="4" href="/repository">
          Apuntes
        </Link>
        <Link px="4" href="/events">
          Eventos
        </Link>
      </Box>

      <User />
    </Flex>
  );
};

/*

import React, { useState } from 'react';
import { Navbar, NavLink } from '@chakra-ui/react';

const Nav = () => {
  const [activeItem, setActiveItem] = useState('home');

  return (
    <Navbar brand="My App">
      <NavLink href="/" active={activeItem === 'home'}>Foro</NavLink>
      <NavLink href="/repository" active={activeItem === 'Apuntes'}>Apuntes</NavLink>
      <NavLink href="/events" active={activeItem === 'events'}>events</NavLink>
    </Navbar>
  );
};

export default Nav;
*/