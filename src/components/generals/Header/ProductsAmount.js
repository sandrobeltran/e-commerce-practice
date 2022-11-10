import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  font-size: 0.8rem;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  font-weight: 600;
  justify-content: center;
  background-color: #ed5c5c;
  position: absolute;
  bottom: 0;
  right: 0;
  color: var(--light);
  border-radius: 50%;
`;

const ProductsAmount = () => {
  const { amount } = useSelector((state) => state.cart);
    console.log(amount)
  return <Container>{amount < 10 ? amount : "9+"}</Container>;
};

export default ProductsAmount;
