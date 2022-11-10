import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import StyledButton from "../Button";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import ProfileMenu from "./ProfileMenu";
import { useState } from "react";
import { setCart } from "features/cart/cartSlice";
import Bag from "./Bag";
import ProductsAmount from "./ProductsAmount";

const Container = styled.header`
  width: 100%;
  height: 68px;
  background-color: var(--dark);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;
const Navbar = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;
const BrandLogo = styled.div`
  position: relative;
  width: 100px;
  height: 40px;
  cursor: pointer;
`;
const NavContainer = styled.ul`
  display: flex;
  gap: 20px;
`;
const NavLink = styled.a`
  font-size: 1rem;
  font-weight: 500;
  color: var(--light);

  &:hover {
    color: var(--yellow);
  }
`;
const ToolsContainer = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  align-items: center;
  gap: 20px;
`;
const ProfileContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
export const BagButton = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  color: var(--yellow);
  cursor: pointer;
  position: relative;

  & ion-icon:hover {
    transform: scale(1.1);
  }
`;


const ProfilePhoto = styled.div`
  width: 46px;
  height: 46px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  & p {
    font-size: 1.7rem;
    font-weight: 600;
    color: var(--dark);
    transform: rotateZ(-45deg);
  }
  & ion-icon {
    font-size: 2rem;
  }
`;

const Header = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  let oldScroll = 0;
  const router = useRouter();
  const [toggleProfileMenu, setToggleProfileMenu] = useState(false);
  const [toggleBag, setToggleBag] = useState(false);

  //HIDE IF THE USER SCROLL DOWN
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    window.addEventListener("scroll", () => {
      const currentScroll = window.scrollY;
      const header = document.querySelector("header");
      if (currentScroll > oldScroll) {
        header.style.top = "-100%";
      } else {
        header.style.top = "0%";
      }
      oldScroll = currentScroll;
    });
  }

  const fillUserCartWithLocal = async()=>{
    const updateCartRequest = await fetch("/api/auth/cart", {
      method: "PUT",
      headers: {
        "x-access-token": localStorage.getItem("session-token")
      },
      body: JSON.stringify(cart)
    })
    const updateCartResponse = await updateCartRequest.json()
    if(!updateCartResponse.success) return alert(updateCartResponse.msg)
    console.log(updateCartResponse.updatedUser)
    console.log("User cart filled with local cart")
  }

  if (user) {
    if(user.cart.products.length){
      dispatch(setCart(user.cart));
      console.log("Actualice el carrito al del usuario actual.");
    }else{
      fillUserCartWithLocal()
    }
  }

  return (
    <Container>
      <Navbar>
        <BrandLogo onClick={() => router.push("/")}>
          <Image
            src={"/logo.svg"}
            layout="fill"
            objectFit="contain"
            objectPosition={"center"}
            priority={true}
          />
        </BrandLogo>
        <NavContainer>
          <Link href={"/"}>
            <NavLink>Home</NavLink>
          </Link>
          <Link href={"/catalog"}>
            <NavLink>Catalog</NavLink>
          </Link>
          <Link href={"/categories"}>
            <NavLink>Categories</NavLink>
          </Link>
          <Link href={"#"}>
            <NavLink>About Store</NavLink>
          </Link>
        </NavContainer>
        <ToolsContainer>
          <BagButton onClick={() => setToggleBag(!toggleBag)}>
            <ion-icon name="bag" />
            {cart.products.length ? <ProductsAmount/> : null}
          </BagButton>
          <Bag toggle={toggleBag} />
          <ProfileContainer title="Profile">
            {user ? (
              <ProfilePhoto
                color={user.color}
                onClick={() => setToggleProfileMenu(!toggleProfileMenu)}
              >
                {toggleProfileMenu ? (
                  <ion-icon name="close" />
                ) : (
                  <p>{user.name[0]}</p>
                )}
              </ProfilePhoto>
            ) : (
              <StyledButton
                hierarchy={"primary"}
                onClick={() => router.push("/auth")}
              >
                🔐 Login
              </StyledButton>
            )}
          </ProfileContainer>
        </ToolsContainer>
      </Navbar>
      {user ? <ProfileMenu toggle={toggleProfileMenu} /> : null}
    </Container>
  );
};

export default Header;
