import { Popover, PopoverTrigger, PopoverContent, PopoverHeader,
PopoverBody, PopoverCloseButton, Button, PopoverFooter,
 FormControl, RadioGroup, Input , Text } from "@chakra-ui/react";
import { useState } from "react";
import {
  Box,
  Stack,
  HStack,
  Radio,
  FormLabel,
} from "@chakra-ui/react";

export function ConfirmationPopover({ message, onConfirm }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sancionType, setSancionType] = useState("ban");
  const [sancionTime, setSancionTime] = useState("");
  

  const handleConfirm = () => {

    

    setIsOpen(false);
    const sancionData = {
      type: sancionType,
      time: sancionTime,
    }
    onConfirm();
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
      <PopoverContent background="bg.100">
        <PopoverHeader>Crecion de sancion</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <Stack spacing={1}>
            <Box>
              <FormControl isRequired>
                <FormLabel>Tipo de reporte</FormLabel>
                <RadioGroup onChange={(e) => setSancionType(e.target.value)} value={sancionType}>
                  <HStack spacing="24px">
                    <Radio value="ban">ban</Radio>
                    <Radio value="mute">mute</Radio>
                    <Radio value="shadowban">shadowban</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel>Tiempo de sancion</FormLabel>
                <Input type="date" onChange={(e) => setSancionTime(e.target.value)} value={sancionTime}/>
              </FormControl>
            </Box>
          </Stack>

        </PopoverBody>
        <PopoverFooter >
        {message}
          <Button colorScheme="green" onClick={handleConfirm} ml={4}>
            Confirmar
          </Button>
          <Button colorScheme="red" onClick={handleCancel} ml={4}>
            Cancelar
          </Button>

        </PopoverFooter>

      </PopoverContent>
    </Popover>
  );
}
