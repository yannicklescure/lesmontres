import styled from "styled-components";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { COLORS } from "../constants";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShopping,
  AiFillShopping,
} from "react-icons/ai";
import { MdOutlineShoppingCart, MdShoppingCart } from "react-icons/md";

const ProductCard = ({ product, getCompanyName }) => {
  // on hover, change outlined heart to filled heart
  const [heartHover, setHeartHover] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  const [isShown, setIsShown] = useState(false);

  // TODO:
  // onClick={addToWishlist}
  // onClick={addToCart}

  return (
    <ProductCardWrapper
      to={`/product/${product._id}`}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <IconsWrapper isShown={isShown}>
        <WishlistIcons
          onMouseEnter={() => setHeartHover(true)}
          onMouseLeave={() => setHeartHover(false)}
        >
          {heartHover ? (
            <AiFillHeart size="22" color="grey" />
          ) : (
            <AiOutlineHeart size="22" color="grey" />
          )}
        </WishlistIcons>
        <CartIcons
          onMouseEnter={() => setCartHover(true)}
          onMouseLeave={() => setCartHover(false)}
        >
          {cartHover ? (
            <MdShoppingCart size="22" color="grey" />
          ) : (
            <MdOutlineShoppingCart size="22" color="grey" />
          )}
        </CartIcons>
      </IconsWrapper>

      <ImgWrapper>
        <StyledImg 
          key={product._id} 
          src={product.imageSrc} 
          alt={product._id} 
          isShown={isShown}
        />
      </ImgWrapper>
      <Description>
        <ItemName>{product.name}</ItemName>
        <CompanyName>{getCompanyName(product.companyId)}</CompanyName>
        <Price>{product.price}</Price>
      </Description>
    </ProductCardWrapper>
  );
};

const ProductCardWrapper = styled(NavLink)`
  /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
  border: 1px solid ${COLORS.grey};
  width: 275px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 20px;
  text-decoration: none;
  position: relative;
  /* border-radius: 20px; */
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
  cursor: pointer;
`;
const CartIcons = styled.div`
  cursor: pointer;
`;

const ImgWrapper = styled.div`
  /* border: 1px solid ${COLORS.grey}; */
`;

const StyledImg = styled.img`
  width: 200px;
  height: 200px;
  margin: auto;
  padding: 30px;
  object-fit: contain;
  transform: scale(${({isShown}) => isShown ? 1 : 0.9});
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
  padding: 0 15px 0 30px;
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
