import Footer from "components/generals/Footer";
import Header from "components/generals/Header";
import SectionTitle from "components/generals/SectionTitle";
import ProductsList from "components/products";
import Product from "models/Product";
import Head from "next/head";
import styled from "styled-components";
import { dbConnect } from "utils/mongoose";

const Section = styled.section`
  padding: 60px 30px 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: fit-content;
`;

const Catalog = ({ result }) => {
  const products = JSON.parse(result);

  return (
    <>
      <Head>
        <title>Catalog</title>
      </Head>
      <Header />
      <Section>
        <SectionTitle>Catalog</SectionTitle>
        <ProductsList products={products}></ProductsList>
      </Section>
      <Footer />
    </>
  );
};

export default Catalog;

export const getServerSideProps = async () => {
  try {
    dbConnect();
    const products = await Product.find();
    return {
      props: { result: JSON.stringify(products) },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};
