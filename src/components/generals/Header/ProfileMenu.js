import styled from "styled-components";
import StyledButton from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "features/user/userSlice";

const Container = styled.div`
  width: 300px;
  height: 400px;
  background-color: var(--yellow);
  display: ${(props) => (props.toggle ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 30px 10px 10px 10px;
  gap: 10px;
  position: absolute;
  top: 100%;
  right: 30px;
  box-shadow: 0 2px 20px #12121244;
`;
const ProfilePhotoMenu = styled.div`
  width: 150px;
  height: 150px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px #12121244;

  & p {
    font-size: 4.5rem;
    font-weight: 600;
    color: var(--dark);
    transform: rotateZ(-45deg);
    user-select: none;
  }
`;
const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
  width: 100%;
`;
const ProfileName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;
const ProfileEmail = styled.p`
  font-size: 1rem;
  width: 100%;
  font-weight: 500;
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;
const LogoutButton = styled(StyledButton)`
  position: absolute;
  left: 0;
  right: 0;
  width: fit-content;
  bottom: 30px;
  margin: 0 auto;
  background-color: var(--violet);
  color: var(--dark);
`;

const ProfileMenu = ({ toggle }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    //LOGOUT THE USER DELETING IT OF THE STATE AND THE LOCALSTORAGE
  const logout = () => {
    if (confirm("Are you sure to want to logout?")) {
      localStorage.removeItem("session-token");
      dispatch(setUser(null));
    }
  };
  return (
    <Container toggle={toggle}>
      <ProfilePhotoMenu color={user.color}>
        <p>{user.name[0]}</p>
      </ProfilePhotoMenu>
      <ProfileInfoContainer>
        <ProfileName>{user.name}</ProfileName>
        <ProfileEmail>{user.email}</ProfileEmail>
      </ProfileInfoContainer>
      <LogoutButton hierarchy={"primary"} onClick={() => logout()}>
        Logout
      </LogoutButton>
    </Container>
  );
};

export default ProfileMenu;
