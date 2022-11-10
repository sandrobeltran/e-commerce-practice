import { useSelector } from "react-redux";
import styled from "styled-components";
import Image from "next/image";
import ProductItem from "./ProductItem";

const Container = styled.div`
    width: 330px;
    height: 370px;
    position: absolute;
    top: 100%;
    left: -160%;
    background-color: var(--yellow);
    display: ${props => props.toggle ? "flex" : "none"};
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px;
    gap: 20px;
`
const Title = styled.h4`
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--dark);
`
const Description = styled.p`
  font-size: 1rem;
  width: 60%;
  text-align: center;
  font-weight: 600;
`
const Products = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 70px);
  grid-auto-flow: row;
  grid-auto-rows: 70px;
  grid-gap: 10px;

  &::-webkit-scrollbar{
    width: 5px;
    height: 5px;
    background-color: var(--yellow);
  }
  &::-webkit-scrollbar-thumb{
    background-color: var(--violet);
  }
`

const Bag = ({ toggle }) => {
  const cart = useSelector(state => state.cart)
  console.log(cart)
  const { products } = useSelector(state => state.cart)

  if(!products.length){
    return (
      <Container toggle={toggle}>
        <Title>Bag</Title>
        <Image src={"/empty_bag.svg"} width={170} height={170} objectFit={"contain"} objectPosition={"center"} />
        <Description>Your bag is currently empty.</Description>
      </Container>
    )
  }

  return (
    <Container toggle={toggle}>
      <Title>Bag</Title>
      <Products>
        {products.map((product)=> <ProductItem key={product._id} product={product} />)}
      </Products>
    </Container>
  )
}

export default Bag
