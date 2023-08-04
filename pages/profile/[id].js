// Post.js
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { VStack, Box, Grid } from "@chakra-ui/react";
import { ChatIcon, ArrowUpIcon } from "@chakra-ui/icons";

export default function Profile({ user }) {
    const router = useRouter();
    let { id } = router.query;

    return (
        <Layout>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const res = await fetch(`http://localhost:3000/api/user/getOne/${id}`);
    const data = await res.json();
    if (res.status === 400) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            post: data.data,
        },
    };
}