import { Tab, Tabs, TabList, TabPanel, TabPanels, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import PostsCard from "../Post/PostsCard";
import CommentCard from "../Comment/CommentCard";

export default function TabProfile({ user }) {
  
    return (
    <Box
      width="100%"
      margin="auto"      
      mt={4}
    >
      <Tabs w="full" variant="soft-rounded" isFitted >
        <TabList  gap={2} bg="post.100"
      borderRadius="md" p={4}>
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
        </TabList>
        <TabPanels>
          <TabPanel>
            {user.posts.map((post) => (
              <PostsCard key={post._id} post={post} />
            ))}
          </TabPanel>
          <TabPanel>
            {user.favs.map((fav) => (
              <PostsCard key={fav._id} post={fav} />
            ))}

          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
