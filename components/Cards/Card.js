
import Image from 'next/image'
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    Link,
} from '@chakra-ui/react'
import { useState } from 'react';


export default function Card({ title, image, description, link, top, footer }) {
    const [imageSrc, setImageSrc] = useState(image);
    const defaultImage = "/default/landscape.jpg";

    const handleImageError = (e) => {
        setImageSrc(defaultImage);
    }
    return (
        <Center py={6} display={"inline-block"} margin={"15px"}>
            <Link href={link}>
                <Box
                    w="380px"
                    h="450px"
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'dark-lg'}
                    rounded={'md'}
                    padding={"20px"}
                    display={"grid"}
                >
                    <Box>
                        <Box h={'200px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
                            <Image
                                src={imageSrc}
                                alt="Imagen principal"
                                fill
                                priority={true}
                                sizes="(max-width: 100%) , (max-width: 100%)"
                                onError={() => handleImageError()}

                            />
                        </Box>
                        <Stack overflow={"auto"}>
                            <Text
                                color={'green.500'}
                                textTransform={'uppercase'}
                                fontWeight={800}
                                fontSize={'sm'}
                                letterSpacing={1.1}>
                                {top}
                            </Text>
                            <Heading
                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                color={useColorModeValue('gray.700', 'white')}
                                fontSize={'2xl'}
                                fontFamily={'body'}>
                                {title}
                            </Heading>
                            <Text color={'gray.500'} >
                                {description}
                            </Text>
                        </Stack>
                        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                <Text color={'gray.500'}>{footer}</Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </Link >
        </Center>
    )
}