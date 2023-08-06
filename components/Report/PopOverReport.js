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
    import { useForm } from "react-hook-form";
import { get } from "mongoose";
    
    
    export default function ConfirmationPopover({ message, onConfirm }) {
      const [isOpen, setIsOpen] = useState(false);
      const{register, watch, reset, handleSubmit, formState: { errors }} = useForm();
      

      const handleTypeChange = () => {
        if (watch("type") === "permanentemente") {
          reset({ date: new Date(null) }); 
        }
      };
 
      const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };
      const onSubmit = (data) => {
        const sancionData = {
          type: data.value,
          time: data.date,
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
                    <RadioGroup  >
                      <Stack spacing={4} direction="row" onChange={handleTypeChange}>
                        <Radio value="temporalmente" {...register("type", { required: true })} />
                        <Text>temporal</Text>
                        <Radio value="permanentemente" {...register("type", { required: true })} />
                        <Text>permanente</Text>
                      </Stack>
                    </RadioGroup>
                    {errors.value && <Text color="red">Este campo es requerido</Text>}
                  </FormControl>
                  { watch("type") === "temporalmente" ? (
                    <FormControl isRequired>
                      <FormLabel>Duracion</FormLabel>
                      <Input type="date" min={getCurrentDate()} {...register("date", { required: true })} />
                    </FormControl>
                  ): null}
                </Box>
              </Stack>
            </PopoverBody>
            <PopoverFooter  borderColor='bg.100' >
            {message}
              {( watch("date")  && watch("type") === "temporalmente") || watch("type")=== "permanentemente" ?   (
                <Button colorScheme="green" onClick={handleSubmit(onSubmit)} ml={4}>
                  Confirmar
                </Button>
              ) : (
                <Button colorScheme="green" isDisabled>
                  Confirmar
                </Button>
              )}
              <Button colorScheme="red" onClick={handleCancel} ml={4}>
                Cancelar
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      );
    }