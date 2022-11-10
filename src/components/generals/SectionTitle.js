import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;

    & h2{
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--violet);
    }
`

const SectionTitle = ({ children }) => {
  return (
    <Container>
      <h2>{children}</h2>
    </Container>
  )
}

export default SectionTitle
