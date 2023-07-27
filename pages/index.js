import { Box, Text, Card, Flex, CardBody, Avatar, CardHeader, CardFooter, Heading, Button, VStack, Stack, useDisclosure } from '@chakra-ui/react';
import { ArrowUpIcon, ChatIcon } from '@chakra-ui/icons';
import Layout from '../components/Layout/Layout';
import PostsCard from '../components/Post/PostsCard';
import { useSession } from "next-auth/client";
import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react';


const { data: session, status } = useSession();
const {isOpen,onOpen,onClose} = useDisclosure();
const [isCreatePost,setIsCreatePost] = useState(false);
const [postsContent, setPostContent] = useState("");
const [postsTitle, setPostTitle] = useState("");


const handlerPost = (e) =>{
  setPostC(e.target.value);
}

const handlerCreatePost = () =>{
  if(status === "authenticated"){
    setIsCreatePost(true);
    axios.post(`http://localhost:3000/api/post/create`,{
      title: postsTitle,
      content: postsContent,
      creator: session.user.id,
    })
    .then((res) =>{
      setPostTitle("");
      setPostContent("");
      setIsCreatePost(false);
    })
    .catch((err) =>{
      console.log(err);
      setIsCreatePost(false);
    });
  }else{
    onOpen();
  }
}

const Posts = ({ posts }) => {
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
  const res = await fetch(`http://localhost:3000/api/post/getAll`);
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
