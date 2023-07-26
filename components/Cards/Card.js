
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

export default function blogPostWithImage({ title, image, description, link, top,footer }) {
    return (
        <Center py={6} display={"inline-block"} margin={"15px"}>
            <Link href={link}>
                <Box
                    w="380px"
                    h="400px"
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    p={6}
                    overflow={'hidden'}>
                    <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
                        <Image
                            src={image}
                            fill
                            alt="Example"
                            priority={true}
                            sizes="(max-width: 100%) , (max-width: 100%)"

                        />
                    </Box>
                    <Stack>
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
                        <Text color={'gray.500'}>
                            {description}
                        </Text>
                    </Stack>
                    <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                            <Text color={'gray.500'}>{footer}</Text>
                        </Stack>
                    </Stack>
                </Box>
            </Link >
        </Center>
    )
}