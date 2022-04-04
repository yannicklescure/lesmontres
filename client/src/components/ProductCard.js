import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { COLORS } from "../constants";
import {
  AiOutlineHeart,
  AiFillHeart,
  // AiOutlineShopping,
  // AiFillShopping,
} from "react-icons/ai";
import { MdOutlineShoppingCart, MdShoppingCart } from "react-icons/md";
import { UserContext } from "../contexts/UserContext";

const ProductCard = ({ product, getCompanyName }) => {
  const history = useHistory();
  // on hover, change outlined heart to filled heart
  // const [heartHover, setHeartHover] = useState(false);
  // const [cartHover, setCartHover] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  const {
    state: { user },
    actions: { updateUser },
  } = useContext(UserContext);
  
  useEffect(() => {
    const wishListPosition = user.wishList.findIndex(item => item._id === product._id);
    setIsWishlisted(wishListPosition !== -1);
    const cartPosition = user.cartArray.findIndex(item => item._id === product._id);
    setIsInCart(cartPosition !== -1);
    // eslint-disable-next-line
  }, [])

  const handleCart = () => {
    // console.log(user.email);
    if (!user.email) {
      history.push('/login');
      return;
    }

    setIsInCart(!isInCart);
    setForceUpdate(forceUpdate + 1);

    const productId = product._id;
    // update the cartArray state

    const findProduct = user.cartArray.findIndex(
      (item) => item._id === productId
    );
    console.log(findProduct);
    const copy = user.cartArray;
    if (findProduct === -1) {
      copy.push(product);
    } else {
      copy.splice(findProduct, 1);
    }
    console.log(copy);
    // updateUser({ user: { ...user, cartArray: copy } });
    updateUser({ user: { ...user, cartArray: copy } });
    fetch(`/api/cart`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartArray: copy,
        email: user.email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleWishList = () => {
    // console.log(user.email);
    if (!user.email) {
      history.push('/login');
      return;
    }

    setIsWishlisted(!isWishlisted);
    setForceUpdate(forceUpdate + 1);

    const productId = product._id;
    // update the wishList state

    const findProduct = user.wishList.findIndex(
      (item) => item._id === productId
    );
    console.log(findProduct);
    const copy = user.wishList;
    if (findProduct === -1) {
      copy.push(product);
    } else {
      copy.splice(findProduct, 1);
    }
    console.log(copy);
    updateUser({ user: { ...user, wishList: copy } });
    fetch(`/api/wishList2`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wishList: copy,
        email: user.email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <ProductCardWrapper
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <IconsWrapper isShown={isShown}>
        <WishlistIcons
          // onMouseEnter={() => setHeartHover(true)}
          // onMouseLeave={() => setHeartHover(false)}
          isWishlisted={isWishlisted}
          onClick={handleWishList}
          forceUpdate={forceUpdate}
        >
          {isWishlisted ? (
            <AiFillHeart size="24" />
          ) : (
            <AiOutlineHeart size="24" />
          )}
        </WishlistIcons>
        <CartIcons
          // onMouseEnter={() => setCartHover(true)}
          // onMouseLeave={() => setCartHover(false)}
          isInCart={isInCart}
          onClick={handleCart} 
        >
          {isInCart ? (
            <MdShoppingCart size="24" />
          ) : (
            <MdOutlineShoppingCart size="24" />
          )}
        </CartIcons>
      </IconsWrapper>

      <ImgWrapper to={`/product/${product._id}`}>
        <StyledImg
          key={product._id}
          src={product.imageSrc}
          alt={product._id}
          isShown={isShown}
        />
      </ImgWrapper>
      <Description>
        <CompanyName>{getCompanyName(product.companyId, product.category.toLowerCase())}</CompanyName>
        <ItemName>{product.name}</ItemName>
        <Price>{product.price}</Price>
      </Description>
    </ProductCardWrapper>
  );
};

const ProductCardWrapper = styled.div`
  /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
  border: 0.5px solid #e6e6e6;
  border-radius: 5px;
  width: 275px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 20px;
  text-decoration: none;
  position: relative;
`;

const IconsWrapper = styled.div`
  /* border: 1px solid red; */
  /* margin-left: 195px; */
  display: ${({ isShown }) => (isShown ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: fit-content;
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1000;
`;

const WishlistIcons = styled.div`
  color: ${({isWishlisted}) => isWishlisted ? COLORS.danger : COLORS.secondary};
  cursor: pointer;

  &:hover {
    color: ${COLORS.secondary};
  }
`;
const CartIcons = styled.div`
  color: ${({isInCart}) => isInCart ? COLORS.success : COLORS.secondary};
  cursor: pointer;

  &:hover {
    color: ${COLORS.secondary};
  }
`;

const ImgWrapper = styled(NavLink)`
  /* border: 1px solid ${COLORS.grey}; */
`;

const StyledImg = styled.img`
  width: 200px;
  height: 200px;
  margin: auto;
  padding: 30px;
  object-fit: contain;
  transform: scale(${({ isShown }) => (isShown ? 1 : 0.9)});
  transition: all 300ms ease;
`;

const Description = styled.div`
  /* border: 2px solid purple; */
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ItemName = styled.div`
  padding: 0 15px 12px 30px;
  color: ${COLORS.secondary};
  text-decoration: none;
  /* text-transform: uppercase; */
  font-size: 14px;
  font-family: Lato, sans-serif;
  font-weight: bold;
  /* letter-spacing: 1px; */
`;

const CompanyName = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  font-family: Lato, sans-serif;
  text-decoration: none;
  color: black;
`;

const Price = styled.div`
  font-family: Poppins, sans-serif;
  font-weight: bold;
  font-size: 18px;
  text-decoration: none;
  color: black;
  padding-bottom: 15px;
`;

export default ProductCard;
