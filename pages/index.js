import { Box, Text, Card, Flex, CardBody, Avatar, CardHeader, CardFooter, Heading, Button, VStack, Stack, useDisclosure } from '@chakra-ui/react';
import { ArrowUpIcon, ChatIcon } from '@chakra-ui/icons';
import Layout from '../components/Layout/Layout';
import PostsCard from '../components/Post/PostsCard';
import { useState } from 'react';
import PaginationControls from '../components/Post/PaginationControls .js';
import PostSearch from '../components/Post/PostSearch';


const Posts = ({ posts }) => {

  const [allPosts, setAllPosts] = useState(posts);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (searchQuery) => {
    const filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setAllPosts(filteredPosts);
    setCurrentPage(1);
  };

  return (
    <Layout>
      <PostSearch handleSearch={handleSearch} />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      <Box>
        {currentPosts.map((post) => (
          <PostsCard key={post.id} post={post} setAllPosts={setAllPosts} allPosts={allPosts} subjectId={post.subject} />
        ))}
      </Box>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
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
