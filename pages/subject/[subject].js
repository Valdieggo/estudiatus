import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { count } from "../../models/Post";


export default function Home() {
    const router = useRouter();

    const [subject, setSubject] = useState([]);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (router.isReady) {
            getSubject(router.query.id);
        }
    }, [
        router.isReady,
        !loading
    ]);

    const getSubject = async (id) => {
        const response = await axios.get(`/api/subject/getOne/${id}`).then((res) => {
            setSubject(res.data.data);
        }).then(() => {
            getPosts();
        })
    };

    const getPosts = async () => {
        const response = await axios.get(`/api/post/getAll`).then((res) => {
            const posts = res.data.data.filter((post) => post.subject === subject._id);
            setPosts(posts);
            setLoading(false);
        });
    };

    return (
        <>
            <Head>
                <title>{subject.subjectName}</title>
            </Head>
            <Layout>
                <h1>{subject.subjectName}</h1>
                <ul>
                    {posts.map((post) => (
                        <li key={post._id}>
                            <Link href={`/post/${post._id}`}>
                                <p>Nombre: {post.title}</p>
                                <p>Puntaje: {post.score}</p>
                                <p>Likes: {count(post.likes)}</p>
                                <p>Vistas: {post.view}</p>
                                <p>Creador: {post.creator}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Layout>
        </>
    )
}