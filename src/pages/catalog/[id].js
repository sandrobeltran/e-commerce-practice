import styled from "styled-components";
import Head from "next/head";
import { dbConnect } from "utils/mongoose";
import Header from "components/generals/Header";
import Footer from "components/generals/Footer";
import Product from "models/Product";
import StyledButton from "components/generals/Button";
import { useEffect, useState } from "react";
import SectionTitle from "components/generals/SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "features/cart/cartSlice";
import { setUser } from "features/user/userSlice";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  margin-top: 70px;
`;
const ProductSection = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;
const ProductImage = styled.div`
  width: 50%;
  height: 85%;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const ProductInfo = styled.div`
  width: 50%;
  height: 90%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  padding: 0 30px 30px 30px;
`;
const ProductTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: var(--violet);
`;
const Category = styled.span`
  font-size: 1rem;
  color: var(--light);
  opacity: 0.8;
`;
const Cantity = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 250px;
  height: 60px;

  & p {
    color: var(--light);
    opacity: 0.8;
    font-size: 0.9rem;
    font-weight: 400;
  }
`;
const CustomCantity = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  & label {
    color: var(--violet);
  }
  & input {
    font-size: 1.1rem;
    background-color: transparent;
    border: 1px solid var(--light);
    padding: 10px 15px;
    color: var(--light);
  }
  & input:focus {
    border: 1px solid var(--violet);
    outline: none;
  }
`;
const ProductPrice = styled.p`
  font-size: 2.5rem;
  color: var(--yellow);
  position: relative;
  height: fit-content;

  &::after {
    content: "Per unit";
    font-size: 1rem;
    color: var(--light);
    opacity: 0.8;
    font-weight: 400;
    position: absolute;
    bottom: 0;
    top: 0;
    margin: auto 0;
    width: 200%;
    height: fit-content;
    left: 110%;
  }
`;
const ProductButtons = styled.div``;

const RelatedProducts = styled.div`
  width: 100%;
  height: 300px;
`;
const ProductPage = ({ result }) => {
  const { products } = useSelector(state => state.cart)
  const user = useSelector(state => state.user)
  const product = JSON.parse(result);
  const dispatch = useDispatch();
  const [cantity, setCantity] = useState(1);
  const [unitsInCart, setUnitsInCart] = useState(0)

  const addToBag = async() => {
    if(user){
      const addProductRequest = await fetch("/api/auth/cart", {
        method: "POST",
        headers: {
          "x-access-token": localStorage.getItem("session-token")
        },
        body: JSON.stringify({ product, cantity: parseInt(cantity) })
      })
      const addProductResponse = await addProductRequest.json()
      dispatch(setUser(addProductResponse.updatedUser))
    }else{
      dispatch(addProductToCart({ product, cantity: parseInt(cantity) }));
    }
  };
  useEffect(()=>{
    if(products.find(item => item._id === product._id)){
      setUnitsInCart(products.find(item => item._id === product._id).cantity)
    }
  }, [products])

  if (!product) {
    return (
      <>
        <Head>
          <title>Missing Product</title>
        </Head>
        <Header />
        <Section>
          <p>The product you are looking for doesn't exists.</p>
        </Section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Product</title>
      </Head>
      <Header />
      <Section>
        <ProductSection>
          <ProductImage>
            <img src={product.image} />
          </ProductImage>
          <ProductInfo>
            <div>
              <ProductTitle>{product.title}</ProductTitle>
              <Category>{product.category}</Category>
            </div>
            <ProductPrice>{product.price}$</ProductPrice>
            <Cantity>
              <CustomCantity>
                <label>Insert Cantity</label>
                <input
                  type={"number"}
                  name="cantity"
                  min={1}
                  max={product.cantity - unitsInCart}
                  value={cantity}
                  onChange={(e) => setCantity(e.target.value)}
                />
              </CustomCantity>
              <p>{product.cantity - unitsInCart} units avaliable</p>
            </Cantity>
            <ProductButtons>
              <StyledButton hierarchy={"primary"} onClick={() => addToBag()}>
                Add to Bag
              </StyledButton>
            </ProductButtons>
          </ProductInfo>
        </ProductSection>
        <RelatedProducts>
          <SectionTitle>Related Products</SectionTitle>
        </RelatedProducts>
      </Section>
      <Footer />
    </>
  );
};

export default ProductPage;

export const getServerSideProps = async ({ params }) => {
  try {
    dbConnect();
    const product = await Product.findById(params.id);
    return {
      props: { result: JSON.stringify(product) },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};
