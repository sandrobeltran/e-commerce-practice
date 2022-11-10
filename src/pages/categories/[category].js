import Footer from "components/generals/Footer";
import Header from "components/generals/Header";
import ProductsList from "components/products";
import Product from "models/Product";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import { dbConnect } from "utils/mongoose";
import SectionTitle from "components/generals/SectionTitle";

const Section = styled.section`
  min-height: 100%;
  height: fit-content;
  padding: 60px 30px 20px 30px;
`;

const CategoryPage = ({ result }) => {
  const router = useRouter();
  const { category } = router.query;
  const products = JSON.parse(result)

  return (
    <>
      <Head>
        <title>{category}</title>
      </Head>
      <Header />
      <Section>
        <SectionTitle>Products with the {category} category</SectionTitle>
        <ProductsList products={products}></ProductsList>
      </Section>
      <Footer />
    </>
  );
};

export default CategoryPage;

export const getServerSideProps = async ({ params })=>{
  const { category } = params
  try {
    dbConnect()
    const products = await Product.find({ category: category })
    return {
      props: { result: JSON.stringify(products) }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {}
    }
  }
}