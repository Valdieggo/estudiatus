import { Box, Text, Card, Flex, CardBody, Avatar, CardHeader, CardFooter, Heading, Button, VStack, Stack, useDisclosure } from '@chakra-ui/react';
import { ArrowUpIcon, ChatIcon } from '@chakra-ui/icons';
import Layout from '../components/Layout/Layout';
import PostsCard from '../components/Post/PostsCard';

const Posts = ({ posts ,subjects}) => {
  return (
    <Layout>
      <Box>
        <Stack>

        </Stack>
        {posts.map((post) => (
          <PostsCard key={post.id} post={post} />
        ))}
      </Box>
    </Layout>
  );
};

export default Posts;


export async function getStaticProps() {
  const res = await fetch(`http://localhost:${process.env.PORT}/api/post/getAll`);

  const data = await res.json();
  if (res.status === 400) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts: data.data,
    },
  };
}
