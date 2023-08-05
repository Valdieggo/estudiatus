import { Popover, PopoverTrigger, PopoverContent, PopoverHeader,
    PopoverBody, PopoverCloseButton, Button, PopoverFooter,
     FormControl, RadioGroup, Input , Text, useFormControl } from "@chakra-ui/react";
    import { useState } from "react";
    import {
      Box,
      Stack,
      HStack,
      Radio,
      FormLabel,
    } from "@chakra-ui/react";
    
    
    export default function ConfirmationPopover({ message, onConfirm }) {
      const [isOpen, setIsOpen] = useState(false);
      
      const [value, setValue] = useState("ban")
      const [sancionTime, setSancionTime] = useState(null);
      
      const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };
      const handleConfirm = () => {
        
        const sancionData = {
          type: value,
          time: sancionTime,
        }
        onConfirm(sancionData);
        setIsOpen(false);
      };
    
      const handleCancel = () => {
        setIsOpen(false);
      };
    
      const openPopover = () => {
        setIsOpen(true);
      };
     
    
    
    
      return (
        <Popover isOpen={isOpen} onOpen={openPopover} onClose={handleCancel} closeOnBlur={false}>
          <PopoverTrigger>
            <Button colorScheme="yellow" mx={4}>
              Sancionar
            </Button>
          </PopoverTrigger>
          <PopoverContent background="bg.100"  borderColor='bg.100'>
            <PopoverHeader pt={4} fontWeight='bold' border='0' >Crecion de sancion</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Stack spacing={4}>
                <Box>
                  <FormControl as="fieldset" isRequired>
                    <FormLabel as="legend">Tipo de sancion</FormLabel>
                    <RadioGroup defaultValue="ban" onChange={setValue}>
                      <Stack spacing={4} direction="row">
                        <Radio value="ban">Ban</Radio>
                        <Radio value="mute">Mute</Radio>
                        <Radio value="shadowban">shadowban</Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                  <FormControl isRequired   >
                    <FormLabel>Duracion</FormLabel>
                    <Input type="date" min={getCurrentDate()} onChange={(e) => setSancionTime(e.target.value)} />
                  </FormControl>
                </Box>
              </Stack>
            </PopoverBody>
            <PopoverFooter  borderColor='bg.100' >
            {message}
              {
                sancionTime ? (
                  <Button colorScheme="green" onClick={handleConfirm} ml={4}>
                    Confirmar
                  </Button>
                ) : (
                  <Button isLoading colorScheme="green" >
    
                  </Button>
                )
    
              }
              <Button colorScheme="red" onClick={handleCancel} ml={4}>
                Cancelar
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      );
    }