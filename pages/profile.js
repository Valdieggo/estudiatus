import Head from "next/head";
import Layout from "../components/Layout/Layout";
import CardProfile from "../components/Profile/CardProfile";

export default  function  Home() {
  return (
    <>
    <Layout>
      <CardProfile/>
    </Layout>
    </>

  ) 
}
