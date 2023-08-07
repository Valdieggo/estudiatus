import { Card, CardBody, CardFooter, Heading, Image, Stack, Text, Button } from '@chakra-ui/react';
import SubscribeButton from '../Subscribe/SubButton';

export default function HeaderCard({ title, image, description, type, id }) {
    const defaultImage = "/default/landscape.jpg";

    if(!image) image = defaultImage;
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
            src={image}
            alt='imagen'
        />

        <Stack>
            <CardBody>
            <Heading size='md'>{title}</Heading>

            <Text py='2'>
                {description}
            </Text>
            </CardBody>

            <CardFooter>
                <SubscribeButton type={type} id={id} />
            </CardFooter>
        </Stack>
        </Card>
    );
}