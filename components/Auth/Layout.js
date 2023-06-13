import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
  } from '@chakra-ui/react'

  export default function Layout({ children }) {

    return (
        <Container
            bg="bg.100"
            maxW="100%"
            minH="100vh"
        >
            {children}
        </Container>
    )
}


