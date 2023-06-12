import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";


//obtiene la informacion de un determinado college
export default function Home() {
    //obtiene la id del link
    const router = useRouter();

    //obtiene la informacion del college
    const [career, setCareer] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (router.isReady) {
            getCareer(router.query.id);
        }
    }, [
        router.isReady,
        !loading
    ]);


    const getCareer = async (id) => {
        const response = await axios.get(`/api/career/getOne/${id}`).then((res) => {
            setCareer(res.data.data);
        }).then(() => {
            getSubjects();
        })
    };

    const getSubjects = async () => {
        const response = await axios.get(`/api/subject/getAll`).then((res) => {
            const subjects = res.data.data.filter((subject) => subject.career === career._id);
            setSubjects(subjects);
        });
        setLoading(false);
    };

    return (
        <>
            <Head>
                <p>{career.careerName}</p>
            </Head>
            <Layout>
            <h1>{career.collegeName}</h1>
                <img src={`/photo.svg`} alt={`logo`} />
                <ul>
                    {subjects.map((subject) => (
                        <li key={subject._id}>
                            <Link href={`/career/${subject._id}`}>
                                {subject.subjectName}
                            </Link>
                        </li>
                    ))}
                </ul>
            </Layout>
        </>
    )
}