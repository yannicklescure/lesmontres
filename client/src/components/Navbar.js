import styled from "styled-components";
import {
  AiOutlineClockCircle,
  AiOutlineUser,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from "react-icons/ai";
import { COLORS } from "../constants";
import SubNavbar from "./SubNavbar";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  console.log(location);

  const {
    state: { user },
    actions: { logoutUser },
  } = useContext(UserContext);

  const handleLogout = () => {
    console.log("Logout");
    logoutUser();
    history.push("/");
  };

  return (
    <>
      <MainWrapper>
        <BrandWrapper>
          <Brand>
            <BrandLink to="/">
              LesM
              <AiOutlineClockCircle size="27" />
              ntres
            </BrandLink>
          </Brand>
        </BrandWrapper>

        <SectionRight>
          <SearchBarWrapper>
            <SearchBar />
            <SearchIcon />
          </SearchBarWrapper>
          <IconsContainer>
            {user._id ? (
              <>
                <StyledIconMenu>
                  <StyledIconBtn>
                    <AiOutlineUser size="25" />
                  </StyledIconBtn>
                  <StyledIconSubMenu>
                    <StyledIconItems to="/">My wish list</StyledIconItems>
                    <StyledIconItems to="/">Settings</StyledIconItems>
                    <StyledIconItems to="/">Something</StyledIconItems>
                    <Logout onClick={handleLogout}>LOG OUT</Logout>
                  </StyledIconSubMenu>
                </StyledIconMenu>
                <AiOutlineShoppingCart size="25" />
              </>
            ) : (
              <>
                <StyledIconLink to="/login">
                  <AiOutlineUser size="25" />
                </StyledIconLink>
              </>
            )}
            {/* <AiOutlineShopping size="25" /> */}
          </IconsContainer>
        </SectionRight>
      </MainWrapper>
      {location.pathname !== "/" && <SubNavbar />}
    </>
  );
};

const MainWrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: ${COLORS.darker}; */
  color: ${COLORS.light};
  height: 85px;
  border-bottom: 0.5px solid ${COLORS.grey};
`;

const BrandWrapper = styled.div`
  /* border: 1px solid blue; */
  margin-left: 30px;
  /* background-color: ${COLORS.darker}; */
`;

const Brand = styled.div`
  /* border: 1px solid green; */
  font-size: 35px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BrandLink = styled(NavLink)`
  /* to align clock within text */
  display: flex;
  align-items: flex-end;
  font-family: "Poppins", sans-serif;
  font-size: 32px;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 1px;
  /* color: ${COLORS.light}; */
  color: white;
  transition: all 400ms ease;

  &:hover {
    color: ${COLORS.grey};
    cursor: pointer;
  }
`;

const StyledIconLink = styled(NavLink)`
  text-decoration: none;
  color: ${COLORS.light};
  font-size: 20px;
  transition: all 400ms ease;

  &:hover {
    color: ${COLORS.grey};
    cursor: pointer;
  }
`;

const StyledIconItems = styled(NavLink)``;

const Logout = styled.button`
  background: none;
  border: none;
  width: 100%;
  cursor: pointer;
  text-align: left;
  padding: 0;
  font-size: 16px;
`;

const StyledIconSubMenu = styled.div`
  display: none;
  position: absolute;
  right: 0;
  background-color: ${COLORS.light};
  min-width: 144px;
  font-size: 16px;
  z-index: 1;

  & ${StyledIconItems}, ${Logout} {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  & ${StyledIconItems}:hover, ${Logout}:hover {
    background-color: #f1f1f1;
  }
`;

const StyledIconBtn = styled.button`
  background: none;
  border: none;
  outline: none;
  color: ${COLORS.light};
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIconMenu = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${StyledIconSubMenu} {
    display: block;
  }

  &:hover ${StyledIconBtn} {
    color: ${COLORS.grey};
  }
`;

const SectionRight = styled.div`
  /* border: 1px solid yellow; */
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-right: 30px;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  position: relative;
`;

// const SearchBar = styled.input`
//   /* border: 1px solid ${COLORS.light}; */
//   border: 1px solid white;
//   /* height: 34px; */
//   width: 130px;
//   height: 38px;
//   font-size: 16px;
//   border-radius: 50px;
//   background-color: transparent;
//   opacity: 0.75;
//   color: ${COLORS.grey};
//   /* display: flex; */
//   background-color: ${COLORS.darker};
// `;

const SearchBar = styled.input`
  /* border: 1px solid ${COLORS.light}; */
  border: 1px solid white;
  /* height: 34px; */
  width: 130px;
  height: 38px;
  font-size: 16px;
  border-radius: 50px;
  background-color: transparent;
  opacity: 0.75;
  color: ${COLORS.grey};
  /* display: flex; */
  /* background-color: ${COLORS.darker}; */
`;

const SearchIcon = styled(AiOutlineSearch)`
  font-size: 18px;
  position: absolute;
  left: 78%;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  gap: 8px;
  background-color: transparent;
`;

// const StyledLink = styled.div`
//   text-decoration: none;
// `;
// const StyledBtn = styled.div`
//   background-color: ${COLORS.secondary};
//   color: ${COLORS.light};
//   margin-left: 12px;
//   /* border: 1px solid ${COLORS.purple}; */
//   padding: 8px 12px;
//   border-radius: 4px;
//   transition: all 400ms ease;
//   cursor: pointer;

//   &:hover {
//     background-color: ${COLORS.purple};
//   }
// `;

export default Navbar;
