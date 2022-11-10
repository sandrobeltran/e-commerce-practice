import styled from "styled-components"
import ProductCard from "./ProductCard"

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 230px);
    grid-template-rows: repeat(1, 280px);
    grid-auto-flow: row;
    grid-auto-rows: 280px;
    grid-gap: 30px;
`

const ProductsList = ({ products }) => {
  return (
    <Container>
        {products.length ? products.map(product => <ProductCard product={product} key={product._id} />) : <p>No hay productos en esta categoría</p>}
    </Container>
  )
}

export default ProductsList
