import styled from "styled-components";
import {
  BsSmartwatch,
  BsCart,
  BsCartFill,
  BsFillPersonFill,
} from "react-icons/bs";
import {
  AiOutlineClockCircle,
  AiOutlineUser,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from "react-icons/ai";
import { COLORS } from "../constants";
import SubNavbar from "./SubNavbar";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {

  const {
    state: {
      user
    }
  } = useContext(UserContext);

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

            <StyledIconLink to="/login">
              <AiOutlineUser size="25" />
            </StyledIconLink>

            { user._id && (
              <AiOutlineShoppingCart size="25" />
            ) }
            {/* <AiOutlineShopping size="25" /> */}
          </IconsContainer>
        </SectionRight>
      </MainWrapper>
      <SubNavbar />
    </>
  );
};

const MainWrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLORS.darker};
  color: ${COLORS.light};
  height: 85px;
  border-bottom: 0.5px solid ${COLORS.grey};
`;

const BrandWrapper = styled.div`
  /* border: 1px solid blue; */
  margin-left: 30px;
  background-color: ${COLORS.darker};
`;

const Brand = styled.div`
  /* border: 1px solid green; */
  font-size: 30px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BrandLink = styled(NavLink)`
  /* to align clock within text */
  display: flex;
  align-items: flex-end;
  font-family: "Yeseva One", sans-serif;
  font-size: 32px;
  font-weight: bold;
  text-decoration: none;
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
  background-color: ${COLORS.darker};
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
