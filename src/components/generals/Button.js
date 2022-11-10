import styled from "styled-components";

const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

const StyledButton = styled(Button)`
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 8px 25px;
  background-color: ${(props) =>
    props.hierarchy === "primary" ? "var(--yellow)" : "transparent"};
  color: ${(props) =>
    props.hierarchy === "primary" ? "var(--dark)" : "var(--yellow)"};
  border: ${(props) =>
    props.hierarchy === "secondary" ? "1px solid var(--yellow)" : "none"};
  box-shadow: ${(props) =>
    props.hierarchy === "primary" ? "0px 0px 0 #fff" : "none"};
  text-decoration: ${(props) =>
    props.hierarchy === "terciary" ? "underline" : "none"};

  &:hover {
    ${(props) =>
      props.hierarchy === "primary" ? "box-shadow: 3px 3px 0 #fff" : null}
    background-color: ${(props) =>
      props.hierarchy !== "terciary" ? "var(--yellow)" : "transparent"};
    color: ${(props) =>
      props.hierarchy !== "terciary" ? "var(--dark)" : "var(--yellow)"};
    filter: brightness(0.75);
  }
`;

export default StyledButton;
