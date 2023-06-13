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
        <Box
            bg="bg.100"
            maxW="100vw"
            minH="100vh"
            p="0"
        >
            {children}
        </Box>
    )
}


