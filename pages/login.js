import React from "react";
import { useState } from "react";
import{
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
} from "@chakra-ui/react";

export default function Login() {
    const[error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try{
            //LOGICA DE LOGIN

            //REDIRECCIONAR
            router.push('/');

        }catch(error){
            setError(error.message);
        }
        setError('Credenciales incorrectas');
        setIsLoading(false);
    };

    
    return (
        <Box p={4} marginTop="10" >
          <form onSubmit={handleSubmit} width="100%">
            <Stack spacing={4}>
              <FormControl isRequired isInvalid={error}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Ingresa tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
    
              <FormControl isRequired isInvalid={error}>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
    
              <Button
                type="submit"
                variantColor="teal"
                isLoading={isLoading}
                loadingText="Iniciando sesión..."
                maxWidth={{ base: "100%", md: "auto" }}
              >
                Iniciar sesión
              </Button>
            </Stack>
          </form>
        </Box>
      );
       
}