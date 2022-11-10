import styled from "styled-components";
import StyledButton from "components/generals/Button";
import Image from "next/image";

const Section = styled.section`
  display: flex;
  justify-content: center;
`;

const InfoContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InfoContainerCenter = styled.div`
  width: fit-content;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 15px;
  flex-direction: column;

  & h1 {
    max-width: fit-content;
    font-size: 4.5rem;
    color: var(--yellow);
  }
  & p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
`;
const ImageContainer = styled.div`
  width: 50%;
  height: 100%;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, var(--dark), #12121200);
  }
`;

import React from "react";

const HomeSection = () => {
  return (
    <Section>
      <InfoContainer>
        <InfoContainerCenter>
          <h1>A New Way to Buy.</h1>
          <p>You can buy anything you want.</p>
          <StyledButton hierarchy={"primary"}>🚀 Let's Go!</StyledButton>
        </InfoContainerCenter>
      </InfoContainer>
      <ImageContainer>
        <Image
          src={"/home_background.webp"}
          layout={"fill"}
          objectFit={"cover"}
          objectPosition={"center"}
          priority={true}
        />
      </ImageContainer>
    </Section>
  );
};

export default HomeSection;
