import Header from "components/generals/Header";
import Head from "next/head";
import styled from "styled-components";
import { CategoriesContainer, Category } from "components/categories";
import SectionTitle from "components/generals/SectionTitle";
import Footer from "components/generals/Footer";

const Section = styled.section`
  padding: 60px 30px 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: fit-content;
`;

const CategoriesPage = () => {
  return (
    <>
      <Head>
        <title>Categories</title>
      </Head>
      <Header />
      <Section>
        <SectionTitle>Categories</SectionTitle>
        <CategoriesContainer>
            <Category>Beauty</Category>
            <Category>Technology</Category>
            <Category>Clothes</Category>
        </CategoriesContainer>
      </Section>
      <Footer />
    </>
  );
};

export default CategoriesPage;
