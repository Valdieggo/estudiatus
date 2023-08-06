import { Card, CardBody, CardFooter, Heading, Image, Stack, Text, Button } from '@chakra-ui/react';


export default function HeaderCard({ title, image, description, link, top, footer, children }) {
    return (
        <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        bg="post.100"
        textColor="white"
        _hover={{ bg: 'post.200' }}
        maxW="500px"
        >
        <Image
            objectFit='cover'
            maxW={{ base: '100%', sm: '200px' }}
            src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
            alt='Caffe Latte'
        />

        <Stack>
            <CardBody>
            <Heading size='md'>{title}</Heading>

            <Text py='2'>
                {description}
            </Text>
            </CardBody>

            <CardFooter>
            <Button variant='solid' colorScheme='blue'>
                Suscribirse
            </Button>
            </CardFooter>
        </Stack>
        </Card>
    );
}