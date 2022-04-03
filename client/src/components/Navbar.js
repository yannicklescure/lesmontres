import styled from "styled-components";
import {
  AiOutlineClockCircle,
  AiOutlineUser,
  // AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  // AiOutlineSearch,
} from "react-icons/ai";
import { COLORS } from "../constants";
import SubNavbar from "./SubNavbar";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { WishListContext } from "../contexts/WishListContext";
import SearchBar from "./SearchBar";
import { ItemsContext } from "../contexts/ItemsContext";
import { CategoriesContext } from "../contexts/CategoriesContext";
import WishListBar from "./WishListBar";

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  // console.log(location);
  const isHomepage = location.pathname === "/";
  const isLogin = location.pathname === "/login";
  const isSignup = location.pathname === "/signup";

  const {
    state: { user },
    actions: { logoutUser },
  } = useContext(UserContext);
  const {
    state: { isWishListBarOpen },
    actions: { openWishListBar, closeWishListBar },
  } = useContext(WishListContext);

  const {
    state: { items },
  } = useContext(ItemsContext);

  const {
    localStorage,
    actions: { loadingCategories, receivedCategoriesFromServer },
  } = useContext(CategoriesContext);

  useEffect(() => {
    if (localStorage?.length === 0) {
      let tmp = [];
      loadingCategories();
      items.forEach((item) => {
        if (!tmp.includes(item.category)) tmp.push(item.category);
      });
      receivedCategoriesFromServer({ categories: tmp });
      // console.log(tmp);
    }
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    // console.log("Logout");
    logoutUser();
    history.push("/");
  };

  return (
    <>
      <MainWrapper ishomepage={isHomepage.toString()}>
        <BrandWrapper>
          <Brand>
            <BrandLink to="/" ishomepage={isHomepage.toString()}>
              LesM
              <AiOutlineClockCircle size="27" />
              ntres
            </BrandLink>
          </Brand>
        </BrandWrapper>

        <SectionRight>
          <SearchBar />
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
                <AiOutlineHeart
                  size="25"
                  onClick={() => {
                    if (isWishListBarOpen) {
                      closeWishListBar();
                    } else {
                      openWishListBar();
                    }
                  }}
                />
                <AiOutlineShoppingCart size="25" />
              </>
            ) : (
              <>
                <StyledIconLink to="/login" ishomepage={isHomepage.toString()}>
                  <AiOutlineUser size="25" />
                </StyledIconLink>
              </>
            )}
            {/* <AiOutlineShopping size="25" /> */}
          </IconsContainer>
        </SectionRight>
      </MainWrapper>
      {!isHomepage && !isSignup && !isLogin && <SubNavbar />}
    </>
  );
};

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ ishomepage }) =>
    ishomepage === "true" ? "transparent" : COLORS.black};
  color: ${({ ishomepage }) =>
    ishomepage === "true" ? COLORS.dark : COLORS.light};

  height: 85px;
  border-bottom: 0.5px solid ${COLORS.grey};
  position: relative;
  z-index: 1000;
`;

const BrandWrapper = styled.div`
  margin-left: 30px;
`;

const Brand = styled.div`
  /* border: 1px solid green; */
  font-size: 35px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BrandLink = styled(NavLink)`
  display: flex;
  align-items: flex-end;
  font-family: "Poppins", sans-serif;
  font-size: 32px;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 1px;

  color: ${({ ishomepage }) =>
    ishomepage === "true" ? COLORS.dark : COLORS.light};
  transition: all 400ms ease;

  &:hover {
    color: ${({ ishomepage }) =>
      ishomepage === "true" ? COLORS.secondary : COLORS.grey};
    cursor: pointer;
  }
`;

const StyledIconLink = styled(NavLink)`
  text-decoration: none;

  color: ${({ ishomepage }) =>
    ishomepage === "true" ? COLORS.dark : COLORS.light};

  font-size: 20px;
  transition: all 400ms ease;

  &:hover {
    color: ${({ ishomepage }) =>
      ishomepage === "true" ? COLORS.secondary : COLORS.grey};

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
  z-index: 1000;

  & ${StyledIconItems}, ${Logout} {
    color: ${COLORS.dark};
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
  color: ${COLORS.dark};
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
    color: ${COLORS.dark};
  }
`;

const SectionRight = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-right: 30px;
`;

// const SearchBar = styled.input`
//   border: 1px solid white;
//   width: 130px;
//   height: 38px;
//   font-size: 16px;
//   border-radius: 50px;
//   background-color: transparent;
//   opacity: 0.75;
//   color: ${({isHomepage}) => isHomepage === 'true' ? COLORS.dark : COLORS.light};
// `;

// const SearchIcon = styled(AiOutlineSearch)`
//   font-size: 18px;
//   position: absolute;
//   left: 78%;
// `;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  gap: 8px;
  background-color: transparent;
`;

export default Navbar;
