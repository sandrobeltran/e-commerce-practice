import styled from "styled-components";
import { useField } from "formik";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  height: 46px;
  position: relative;
  margin-bottom: 25px;
`;
const Label = styled.label`
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--yellow);
  position: absolute;
  height: fit-content;
  padding: 0 10px;
  background-color: var(--dark);
  top: 0;
  bottom: 0;
  left: 15px;
  margin: auto 0;
  transform: translate(${(props) => (props.filled ? "-5px, -25px" : "0, 0")});
  z-index: ${(props) => props.filled ? 5 : 0};
`;
const Input = styled.input`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: 1px solid var(--light);
  color: var(--light);
  position: relative;
  padding: 10px 15px;
  font-size: 1rem;
  font-weight: 500;
  z-index: 2;

  &:focus {
    outline: none;
    border: 1px solid var(--yellow);
  }
`;
const ErrorMessage = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #cd5c5c;
`;

const InputText = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [filled, setFilled] = useState(false);

  return (
    <Container>
      <Label filled={filled}>{label}</Label>
      <Input
        {...field}
        {...props}
        autoComplete={"off"}
        onFocus={() => setFilled(true)}
        onBlur={() => setFilled(meta.value ? true : false)}
      />
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </Container>
  );
};

export default InputText;
