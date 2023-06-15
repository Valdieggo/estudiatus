import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import verifyAdmin from "../../utils/verifyAdmin";

export default function Home() {
    verifyAdmin();


    return (
        <>
            <Head>
                <title>Prueba</title>
            </Head>
            <Layout>
                TO DO
            </Layout>
        </>
    )
}
