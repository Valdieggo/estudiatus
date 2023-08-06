import { Popover, PopoverTrigger, PopoverContent, PopoverHeader,
PopoverBody, PopoverCloseButton, Button, PopoverFooter,
  FormControl, RadioGroup, Input , Text, useFormControl, list, Select } from "@chakra-ui/react";
import { useState } from "react";
import {
  Box,
  Stack,
  HStack,
  Radio,
  FormLabel,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";



export default function ConfirmationPopover({ message, onConfirm }) {
  const [isOpen, setIsOpen] = useState(false);
  const{register, watch, reset, setValue, handleSubmit, formState: { errors }} = useForm();
  const lisType = [
    { value: "temporalmente", label: "Temporalmente" },
    { value: "permanentemente", label: "Permanentemente" },
  ];
  



  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const onSubmit = (data) => {
    console.log(data.value);
    console.log(data.date);
    const sancionData = {
      type: data.type,
      time: data.date || null,
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

  const handleTypeChange = () => {
    if (watch("type") === "permanentemente") {
      reset({ date: "" }); 
      // date no es requerido si la sancion es permanente
     
    }
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
              <Select type="type" onChange={handleTypeChange} {...register("type", { required: true })}>
                {lisType.map((type) => (
                  <option style={{ color: 'black' }} key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
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
        {(watch("type") === "temporalmente" && watch("date")) || watch("type")==="permanentemente" ?   (
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