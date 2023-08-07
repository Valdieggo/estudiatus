import { useState } from "react";
import { Input, Box, Button, Flex, Spacer } from "@chakra-ui/react";

const PostSearch = ({ handleSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = () => {
        handleSearch(searchQuery);
    };

    return (
        <Box mb={4} align="center">
            <Input
                width="500px" // Ancho personalizado
                placeholder="Buscar publicaciones..."
                value={searchQuery}
                onChange={handleInputChange}
            />
            <Spacer />
            <Button margin={"5"} colorScheme="teal" onClick={handleSubmit}>
                Buscar
            </Button>
        </Box>
    );
};

export default PostSearch;
