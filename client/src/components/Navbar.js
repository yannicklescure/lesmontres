import styled from "styled-components";
import {
  AiOutlineClockCircle,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";
import { MdOutlineShoppingCart, MdShoppingCart } from "react-icons/md";
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
  // console.log(isHomepage);
  const isLogin = location.pathname === "/login";
  const isSignup = location.pathname === "/signup";

  const {
    state: { user },
    actions: { logoutUser },
  } = useContext(UserContext);

  // const {
  //   state: { isWishListBarOpen },
  //   actions: { openWishListBar, closeWishListBar },
  // } = useContext(WishListContext);

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
                <StyledNavLink to="/cart" ishomepage={isHomepage.toString()}>
                  {
                    user.cartArray.length === 0
                      ? <MdOutlineShoppingCart size="25" />
                      : <CartDiv>
                          <MdShoppingCart size="25" />
                          <span>{user.cartArray.length}</span>
                        </CartDiv>
                  }
                </StyledNavLink>
                <StyledIconMenu ishomepage={isHomepage.toString()}>
                  <StyledIconBtn ishomepage={isHomepage.toString()}>
                    <AiOutlineUser size="25" />
                  </StyledIconBtn>
                  <StyledIconSubMenu>
                    <StyledIconItems to="/order-history">Your Orders</StyledIconItems>
                    <StyledIconItems to="/wish-list">Your wish list</StyledIconItems>
                    <StyledIconItems to="/settings">Settings</StyledIconItems>
                    <Logout onClick={handleLogout}>LOG OUT</Logout>
                  </StyledIconSubMenu>
                </StyledIconMenu>
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
  color: ${({ ishomepage }) => ishomepage === "true" ? COLORS.dark : COLORS.light};
  height: 85px;
  /* border-bottom: 0.5px solid ${COLORS.grey}; */
  position: relative;
  z-index: 1000;
`;

const BrandWrapper = styled.div`
  margin-left: 100px;
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
  color: ${({ishomepage}) => ishomepage === 'true' ? COLORS.dark : COLORS.light};
  transition: all 400ms ease;

  &:hover {
    color: ${({ ishomepage }) =>
      ishomepage === "true" ? COLORS.secondary : COLORS.grey};
    cursor: pointer;
  }
`;

const StyledIconLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ ishomepage }) => ishomepage === "true" ? COLORS.dark : COLORS.light};
  font-size: 20px;
  transition: all 400ms ease;

  &:hover {
    color: ${({ ishomepage }) => ishomepage === "true" ? COLORS.secondary : COLORS.grey};
    cursor: pointer;
  }
`;

const StyledIconItems = styled(NavLink)``;

const StyledNavLink = styled(NavLink)`
  color: ${({ ishomepage }) => ishomepage === "true" ? COLORS.dark : COLORS.light};
  text-decoration: none;

  &:hover {
    color: ${({ ishomepage }) => ishomepage === "true" ? COLORS.secondary : COLORS.grey};
  }
`;

const CartDiv = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
`;

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
  color: ${({ ishomepage }) => ishomepage === "true" ? COLORS.dark : COLORS.light};
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
    color: ${({ ishomepage }) => ishomepage === "true" ? COLORS.secondary : COLORS.grey};
  }
`;

const SectionRight = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-right: 30px;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  gap: 8px;
  background-color: transparent;
`;

export default Navbar;
