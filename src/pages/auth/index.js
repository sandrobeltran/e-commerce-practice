import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
import LoginForm from "components/forms/LoginForm";

export const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Center = styled.div`
  width: 90%;
  height: 90%;
  box-shadow: 0 2px 20px #000;
  display: flex;
`;
export const ImageContainer = styled.div`
    width: 50%;
    height: 100%;
    position: relative;
`
export const FormContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  background-color: var(--dark);
  padding: 30px 20px 30px 20px;
`;
export const FormTitle = styled.h2`
    font-size: 2rem;
    color: var(--yellow);
`

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Section>
        <Center>
            <ImageContainer>
                <Image src={"/login_background.jpg"} layout={"fill"} objectFit={"cover"} objectPosition={"center"} />
            </ImageContainer>
          <FormContainer>
            <FormTitle>Login</FormTitle>
            <LoginForm />
          </FormContainer>
        </Center>
      </Section>
    </>
  );
};

export default LoginPage;
