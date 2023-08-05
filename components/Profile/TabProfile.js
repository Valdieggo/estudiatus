import { Tab, Tabs, TabList, TabPanel, TabPanels, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../Post/PostCard";
import CommentCard from "../Comment/CommentCard";

export default function TabProfile({ user }) {
    
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [favorites, setFavorites] = useState([]);
  
    return (
    <Box
      width="100%"
      margin="auto"
      bg="post.100"
      borderRadius="md"
      p={4}
    >
      <Tabs variant="soft-rounded" isFitted >
        <TabList mb="1em" gap={2}>
          <Tab
             textColor={"white"}
             _hover={{
                bg: "post.200",
              }}
              _selected={{
                bg: "white",
                textColor: "post.100",
              }}
          >
            Posts Publicados
          </Tab>
          <Tab
             textColor={"white"}
             _hover={{
                bg: "post.200",
              }}
              _selected={{
                bg: "white",
                textColor: "post.100",
              }}
          >
            Posts Favoritos
          </Tab>
          <Tab
             textColor={"white"}
             _hover={{
                bg: "post.200",
              }}
              _selected={{
                bg: "white",
                textColor: "post.100",
              }}
          >
            Comentarios
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            1
          </TabPanel>
          <TabPanel>
            2
          </TabPanel>
          <TabPanel>
            3
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
