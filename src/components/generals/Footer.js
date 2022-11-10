import styled from "styled-components";

const Container = styled.footer`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  & h6 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--light);
  }
  & p {
    font-size: 0.9;
    color: var(--violet);
  }
  & p a {
    color: var(--yellow);
  }
  & p a:hover{
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <Container>
      <h6>This is a practice page</h6>
      <p>
        Made by{" "}
        <a href="#" target={"_blank"}>
          Sandro Beltrán
        </a>
      </p>
    </Container>
  );
};

export default Footer;
