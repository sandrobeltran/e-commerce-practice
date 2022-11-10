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

const SignupForm = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const SignupValidationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Name must be longer than 2").max(50, "Name must be shorter than 50").required("Name is required"),
    email: Yup.string()
      .email("Insert a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be longer than 6")
      .required("Password is required"),
  });

  const handleSubmit = async (values, reset) => {
    const signupResquest = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
    const signupResponse = await signupResquest.json()
    if(!signupResponse.auth) return alert(signupResponse.msg)
    localStorage.setItem("session-token", signupResponse.token)
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
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      validationSchema={SignupValidationSchema}
    >
      <FormLayout>
        <InputText name="name" type="text" label={"Name"} />
        <InputText name="email" type="text" label={"Email"} />
        <InputText name="password" type="password" label={"Password"} />
        <StyledButton hierarchy={"primary"} type={"submit"}>
          Signup
        </StyledButton>
        <SeparatorLine><span>Have an account yet?</span></SeparatorLine>
        <StyledButton hierarchy={"secondary"} type={"button"} onClick={()=> router.push("/auth")}>
          Login
        </StyledButton>
      </FormLayout>
    </Formik>
  );
};

export default SignupForm;
