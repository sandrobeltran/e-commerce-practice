import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--violet);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 5px;
  gap: 5px;
`;
const Image = styled.div`
  width: 60px;
  height: 60px;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Title = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  width: 160px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Details = styled.div`
  width: 60px;
  height: 55px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
`;
const DetailsInfo = styled.p`
  font-size: 0.8rem;
  color: var(--dark);
`;
const TotalPrice = styled.p`
  font-size: 1rem;
  color: var(--dark);
  position: relative;
  width: 100%;
  text-align: right;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--dark);
  }
`;

const ProductItem = ({ product }) => {
  return (
    <Container>
      <Image>
        <img src={product.image} />
      </Image>
      <Title>{product.title}</Title>
      <Details>
        <DetailsInfo>{product.price}$</DetailsInfo>
        <DetailsInfo>x{product.cantity}</DetailsInfo>
        <TotalPrice>{product.price * product.cantity}$</TotalPrice>
      </Details>
    </Container>
  );
};

export default ProductItem;
