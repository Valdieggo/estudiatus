import { useSession } from "next-auth/react";
import { Box, VStack, Text, Button, IconButton, Stack, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AddCommentCard({ post, setComments, comments }) {
    const { data: session, status } = useSession();
    const [comment, setComment] = useState("");

    const handleComment = (e) => {
        setComment(e.target.value);
    }

    const handleAddComment = () => {
        axios.post(`http://localhost:3000/api/comment/add/`, {
            text: comment,
            postId: post._id,
            creator: session.user.id,
        })
            .then((res) => {
                console.log(res.data.data);
                setComment("");
                console.log(comments);
                setComments((comments) => [...comments, res.data.data]);
                console.log(comments);
            }
            )
            .catch((err) => {
                console.log(err);
            }
            );
    }

    if(status === "loading") {
        return <div>Loading...</div>
    } else if (status === "error") {
        return <div>Error</div>
    } else if (status === "unauthenticated") {
        return <div>Unauthenticated</div>
    } 

    return (
        <Box color="white" width="100%" maxWidth="500px" margin="auto" bg="post.100" borderRadius="md" p={4}
        _hover={{
            bg: "post.200",
        }}
    >
        <Textarea 
            placeholder="Escribe un comentario..."
            value={comment}
            onChange={handleComment}
            my={4}
        />
        
        <Button
        type="button"
        bg="button.100"
        width="100%"
        _hover={{
            bg: "button.200",
        }}
        onClick={() => handleAddComment()}
        >
            Añadir comentario
        </Button>
    </Box>
    );

}



