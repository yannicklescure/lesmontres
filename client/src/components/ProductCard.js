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

  // TODO:
  // onClick={addToWishlist}
  // onClick={addToCart}

  return (
    <ProductCardWrapper>
      <IconsWrapper>
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

      <CardNavLink to={`/product/${product._id}`}>
        <ImgWrapper>
          <StyledImg
            key={product._id}
            src={product.imageSrc}
            alt={product._id}
          />
        </ImgWrapper>
        <Description>
          <ItemName>{product.name}</ItemName>
          <CompanyName>{getCompanyName(product.companyId)}</CompanyName>
          <Price>{product.price}</Price>
        </Description>
      </CardNavLink>
    </ProductCardWrapper>
  );
};

const ProductCardWrapper = styled.div`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  width: 275px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 20px;
  text-decoration: none;
  border-radius: 20px;
`;

const CardNavLink = styled(NavLink)`
  /* border: 2px solid green; */
  text-decoration: none;
`;

const IconsWrapper = styled.div`
  /* border: 1px solid red; */
  margin-left: 195px;
  display: flex;
  gap: 8px;
  width: fit-content;
  padding: 15px 20px 0 0;
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
