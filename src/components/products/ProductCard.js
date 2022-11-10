import StyledButton from "components/generals/Button";
import { useRouter } from "next/router";
import styled from "styled-components";

const Card = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--violet);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  cursor: pointer;

  &:hover{
    transform: translateY(-5px);
    box-shadow: 0 2px 20px #000;
  }
`;
const ProductImage = styled.div`
  width: 100%;
  height: 45%;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const ProductInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const ProductTitle = styled.h4`
  font-size: 1.1rem;
  color: var(--dark);
`;
const ProductDescription = styled.p`
  font-size: 1rem;
  color: var(--dark);
`;

const ProductCard = ({ product }) => {
  const router = useRouter()

  const viewProductDetails = ()=>{
    router.push(`/catalog/${product._id}`)
  }

  return (
    <Card onClick={()=> viewProductDetails()}>
      <ProductImage>
        <img src={product.image} alt={`${product.title}-product-image`} />
      </ProductImage>
      <ProductInfo>
        <ProductTitle>{product.title}</ProductTitle>
        <ProductDescription>{product.title}</ProductDescription>
      </ProductInfo>
      <StyledButton hierarchy={"primary"}><ion-icon name="eye" />View Product</StyledButton>
    </Card>
  );
};

export default ProductCard;
