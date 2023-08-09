import { Card, Link, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, CardHeader, CardBody, CardFooter, HStack } from '@chakra-ui/react'
import { useState } from 'react';
export default function NavigationCard({ title, image, description, link, top, footer }) {
    const defaultImage = "/estudiatus-pattern.svg";

    if(!image) image = defaultImage;

    const [imageSrc, setImageSrc] = useState(image);

    const handleImageError = (e) => {
        setImageSrc(defaultImage);
    }
    
    return (
        <Card minW=
        {
            {
                base: '400px',
                sm: '400px',
            }
        } overflow='hidden' bg="post.100" textColor="white" _hover={{ bg: 'post.200' }}>
        <CardBody>
            <Image
                src={imageSrc}
                alt="Imagen principal"
                fill
                priority={true}
                maxW='400px'
                onError={() => handleImageError()}
                borderRadius='lg'
            />
            <Stack mt='4' spacing='2'>
            <HStack>
                <Heading size='md'>{title}</Heading>
                <Text color='blue.600' fontSize='lg'>
                    {top}
                </Text>
            </HStack>
            {
                description && (
                    <>
                    <Text fontSize='sm'>{description}</Text>
                    </>
                )
            }
            </Stack>
        </CardBody>
        <CardFooter mt={0}>
            <Link href={link}>
            <Button variant='solid' colorScheme='blue'>
                Ver más
            </Button>
            </Link>
            { footer && ( 
                <Text color='blue.600' fontSize='lg'>
                    {footer}
                </Text>
            )}
        </CardFooter>
        </Card>
    )
}