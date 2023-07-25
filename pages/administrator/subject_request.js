import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import verifyAdmin from "../../utils/verifyAdmin";

export default function SubjectRequest() {
  verifyAdmin();

  return (
    <>
      <Head>
        <title>Prueba</title>
      </Head>
      <Layout>Visualizacion de solicitudes de asignaturas</Layout>
    </>
  );
}
