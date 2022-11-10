import Head from "next/head";
import { Center, FormContainer, FormTitle, ImageContainer, Section } from ".";
import Image from "next/image";
import SignupForm from "components/forms/SignupForm";

const SignupPage = () => {
  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <Section>
        <Center>
            <ImageContainer>
                <Image src={"/login_background.jpg"} layout={"fill"} objectFit={"cover"} objectPosition={"center"} />
            </ImageContainer>
          <FormContainer>
            <FormTitle>Signup</FormTitle>
            <SignupForm />
          </FormContainer>
        </Center>
      </Section>
    </>
  )
}

export default SignupPage
