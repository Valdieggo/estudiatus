import { Box, VStack, Text, Button, IconButton, Stack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
function CommentCard({ comment }) {
    const { creator } = comment;

    const handleLike = () => {
        console.log("Like button clicked");
    };
    const handleReply = () => {
        console.log("Reply button clicked");
    };

    const handleDelete = () => {
        console.log("Delete button clicked");
    };

    const handleEdit = () => {
        console.log("Edit button clicked");
    };

    const handleReport = () => {
        console.log("Report button clicked");
    };
    
    if (!creator.img) {
        creator.img = "/photo.svg";
    }

    return (
    <Box color="white" width="100%" maxWidth="500px" margin="auto" bg="post.100" borderRadius="md" p={4}
        _hover={{
            bg: "post.200",
        }}
    >
        <Stack direction="row" spacing={4} align="center">
            <VStack spacing={0} align="flex-start">
                <Link href={`/profile/${creator._id}`}>
                    <Image
                        src={creator.img}
                        alt="creator img"
                        width={50}
                        height={50}
                        className="avatar"
                    />
                </Link>
                <Text fontSize="sm">{creator.username}</Text>
            </VStack> 
            <Box d="flex" alignItems="center">
                <Text pl={2}>{comment.text}</Text>
            </Box>
        </Stack>
        <Stack direction="row" spacing={4} pt={4}>
            <Button
            type="button"
            bg="button.100"
            width="100%"
            _hover={{
                bg: "button.200",
            }}
            onClick={() => handleReply()}
            >
                Responder
            </Button>
            <Button
                type="button"
                bg="button.100"
                width="100%"
                _hover={{
                    bg: "button.200",
                    }}
                onClick={() => handleLike()}
                >
                    Like
            </Button>
        </Stack>
        
    </Box>
  );
}

export default CommentCard;
