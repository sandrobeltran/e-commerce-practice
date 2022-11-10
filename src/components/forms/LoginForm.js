import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "./InputText";
import StyledButton from "components/generals/Button";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "features/user/userSlice";
import { useEffect } from "react";

const FormLayout = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 100%;
  gap: 20px;
`;
const SeparatorLine = styled.div`
  width: 100%;
  height: 30px;
  position: relative;

  &::after{
    content: "";
    width: 100%;
    height: 1px;
    position: absolute;
    inset: 0;
    margin: auto;
    background-color: var(--violet);
  }

  & span{
    font-size: .9rem;
    color: var(--light);
    background-color: var(--dark);
    position: absolute;
    inset: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;
    padding: 0 5px;
    z-index: 1;
    opacity: 1;
  }
`

const LoginForm = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const LoginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Insert a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be longer than 6")
      .required("Password is required"),
  });

  const handleSubmit = async (values, reset) => {
    const loginRequest = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
    const loginResponse = await loginRequest.json()
    if(!loginResponse.auth) return alert(loginResponse.msg)
    localStorage.setItem("session-token", loginResponse.token)
    const getUserRequest = await fetch("/api/auth", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("session-token")
      }
    })
    const getUserResponse = await getUserRequest.json()
    if(!getUserResponse.auth) return alert(getUserResponse.msg)

    dispatch(setUser(getUserResponse.user))

    reset();
  };
  
  useEffect(()=>{
    if(user){
      router.push("/")
    }
  }, [user])

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      validationSchema={LoginValidationSchema}
    >
      <FormLayout>
        <InputText name="email" type="text" label={"Email"} />
        <InputText name="password" type="password" label={"Password"} />
        <StyledButton hierarchy={"primary"} type={"submit"}>
          Login
        </StyledButton>
        <SeparatorLine><span>Doesn't have an account yet?</span></SeparatorLine>
        <StyledButton hierarchy={"secondary"} type={"button"} onClick={()=> router.push("/auth/signup")}>
          Signup
        </StyledButton>
        <SeparatorLine><span>Don't want an account?</span></SeparatorLine>
        <StyledButton hierarchy={"terciary"} type={"button"} onClick={()=> router.push("/")}>
          Continue as invited
        </StyledButton>
      </FormLayout>
    </Formik>
  );
};

export default LoginForm;
