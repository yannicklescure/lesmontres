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
  const [isShown, setIsShown] = useState(false);
  const [fillHeart, setFillHeart] = useState(false);

  return (
    <ProductCardWrapper>
      <IconsWrapper>
        <AiOutlineHeart />
        <AiFillHeart />
        <MdOutlineShoppingCart />
        <MdShoppingCart />
        <button
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          btn
        </button>
        {isShown && <div>hello!</div>}
        {/* <HeartFillIcon />
        <CartOutlineIcon />
        <CartFillIcon /> */}
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
  border: 1px solid ${COLORS.grey};
  width: 275px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 20px;
  text-decoration: none;
`;

const CardNavLink = styled(NavLink)``;

const IconsWrapper = styled.div``;
// const HeartOutlineIcon = styled(AiOutlineHeart)``;
// const HeartFillIcon = styled(AiFillHeart)``;
// const CartOutlineIcon = styled(HiOutlineShoppingCart)``;
// const CartFillIcon = styled(HiShoppingCart);

const ImgWrapper = styled.div`
  /* border: 1px solid ${COLORS.grey}; */
`;

const StyledImg = styled.img`
  /* object-fit: contain; */
  /* border: 2px solid blue; */
  width: 200px;
  height: 200px;
  margin: auto;
  padding: 30px;
  /* margin-bottom: 20px; */
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
`;

const Price = styled.div`
  font-family: Poppins, sans-serif;
  font-weight: bold;
  font-size: 18px;
  text-decoration: none;
`;

export default ProductCard;
