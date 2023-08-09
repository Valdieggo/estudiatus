// Post.js
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { VStack, Box, Grid } from "@chakra-ui/react";
import { ChatIcon, ArrowUpIcon } from "@chakra-ui/icons";
import TabProfile from "../../components/Profile/TabProfile";
import CardProfile from "../../components/Profile/CardProfile";

export default function Profile({ user }) {
    const router = useRouter();
    let { id } = router.query;

    return (
        <Layout>
            <Box width="100%" maxWidth="800px" margin="auto">
                <CardProfile user={user} />
                <TabProfile user={user} />
                
            </Box>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const res = await fetch(`http://localhost:${process.env.PORT}/api/user/getOnePopulated/${id}`);
    const data = await res.json();
    if (res.status === 400) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            user: data.data,
        },
    };
}