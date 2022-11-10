import { useRouter } from "next/router";
import styled from "styled-components";

const Section = styled.section`
  height: fit-content;
  display: flex;
  justify-content: center;
`;
export const CategoriesContainer = styled.div`
  width: 90%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 160px);
  grid-auto-flow: row;
  grid-auto-rows: 1fr;
  grid-gap: 20px;
`;
const CategoryComponent = ({ children, ...props }) => {
  const router = useRouter()

  const goToCategory = ()=>{
    router.push(`/categories/${children.toLowerCase()}`)
  }

  return (
    <div {...props} onClick={()=> goToCategory()}>
      <h4>{children}</h4>
    </div>
  );
};
export const Category = styled(CategoryComponent)`
  width: 100%;
  height: 100%;
  background-color: var(--yellow);
  color: var(--dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const CategoriesSection = () => {
  return (
    <Section>
      <CategoriesContainer>
        <Category>Beauty</Category>
        <Category>Technology</Category>
        <Category>Clothes</Category>
      </CategoriesContainer>
    </Section>
  );
};

export default CategoriesSection;
