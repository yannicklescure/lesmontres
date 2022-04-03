import styled from "styled-components";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { COLORS } from "../constants";
import Loading from "../components/Loading";

const ProductDetails = () => {
  // fetch the product from the server by id
  const [product, setProduct] = useState({ _id: null });
  const id = useParams()._id;

  // we would usually put this in the helper file, since we are using it in multiple files
  const getCompanyName = (id) => {
    // return companies.find((company) => company._id === id).name;
    return "company";
  };

  useEffect(() => {
    fetch(`/api/items/${id}`)
      .then((res) => res.json())
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      });
  }, [id]);

  if (!product._id) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <ProductImg>
          <StyledImg src={product.imageSrc} alt="{product.imageSrc}" />
        </ProductImg>
        <Description>
          {product.numInStock === 0 ? (
            <OutOfStock>Out of Stock</OutOfStock>
          ) : (
            <InStock>In Stock</InStock>
          )}
          <ItemName>{product.name}</ItemName>
          <CompanyName>{getCompanyName(product.companyId)}</CompanyName>
          <Category>Category: {product.category}</Category>
          <BodyLocation>Body Location: {product.body_location}</BodyLocation>
          <Price>{product.price}</Price>
          <AddToCart>Add to Cart</AddToCart>
          <AddToWishList>Add to Wishlist</AddToWishList>
        </Description>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  border: 0.5px solid #e6e6e6;
  border-radius: 5px;
  padding: 30px;
`;

const ProductImg = styled.div`
  /* border: 1px solid blue; */
  padding-right: 30px;
`;
const StyledImg = styled.img`
  margin: auto;
  object-fit: contain;
`;

const Description = styled.div`
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
  /* gap: 10px; */
`;

const OutOfStock = styled.div`
  background-color: ${COLORS.danger};
  text-transform: uppercase;
  font-size: 12px;
  font-family: Lato, sans-serif;
  text-decoration: none;
  color: black;
`;
const InStock = styled.div`
  background-color: ${COLORS.mediumAquamarine};
  /* text-transform: uppercase; */
  font-size: 12px;
  font-family: Lato, sans-serif;
  text-decoration: none;
  color: white;
  padding: 5px;
  width: fit-content;
`;

const ItemName = styled.div`
  /* padding: 0 15px 12px 30px; */
  color: ${COLORS.secondary};
  text-decoration: none;
  /* text-transform: uppercase; */
  font-size: 18px;
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

const Category = styled.div``;
const BodyLocation = styled.div``;

const Price = styled.div`
  font-family: Poppins, sans-serif;
  font-weight: bold;
  font-size: 18px;
  text-decoration: none;
  color: black;
  padding-bottom: 15px;
`;

const AddToCart = styled.button`
  /* background-color: ${COLORS.yellowOrange}; */
  background-color: transparent;
  border: 1px solid ${COLORS.grey};
  padding: 10px;
  margin-bottom: 5px;
`;

const AddToWishList = styled.button`
  background-color: transparent;
  border: 1px solid ${COLORS.grey};
  padding: 10px;

`;

export default ProductDetails;
