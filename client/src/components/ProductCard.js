import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { COLORS } from "../constants";

const ProductCard = ({ product, getCompanyName }) => {
  return (
    <ProductCardWrapper to={`/product/${product._id}`}>
      <ImgWrapper>
        <StyledImg key={product._id} src={product.imageSrc} alt={product._id} />
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
  border: 1px solid ${COLORS.grey};
  width: 275px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 20px;
`;

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
`;

const Price = styled.div`
  font-family: Poppins, sans-serif;
  font-weight: bold;
  font-size: 18px;
`;

export default ProductCard;
