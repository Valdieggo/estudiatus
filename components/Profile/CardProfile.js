import {
    Box,
    Stack,
    Flex,
    Heading,
    Text,
    Avatar,
  } from "@chakra-ui/react";
  
  export default function CardProfile({user}) {
    return (
      <Box
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        color="white"
        width="100%"
        margin="auto"
        bg="post.100"
        borderRadius="md"

        py={8}
        px={8}
      >
        <Avatar
          size='2xl'
          name={user.username}
          bg="blue.700"
          color="white"
        />
  
        <Stack flex="1"   px={10} py={2} gap={4}>
          <Heading size='md'><Text>{user.username}</Text></Heading>
  
            <Flex alignItems="center" >
                <Box textAlign="center" pr={4}>
                    <Text>Likes</Text>
                    <Text>{user.score}</Text>
                </Box>
                <Box textAlign="center" pl={4}>
                    <Text>Posts</Text>
                    <Text>{user.posts.length}</Text>
                </Box>
            </Flex>
         
        </Stack>
      </Box>
    );
  }



