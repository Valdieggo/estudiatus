import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import verifyAdmin from "../../utils/verifyAdmin";

export default function Home() {
    if(!verifyAdmin()){
        return null
    }

    return (
        <>
            <Head>
                <title>Prueba</title>
            </Head>
            <Layout>
                subject
            </Layout>
        </>
    )
}
