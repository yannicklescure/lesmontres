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
          {product.numInStock === 0 && <OutOfStock>out of stock</OutOfStock>}
          <ItemName>{product.name}</ItemName>
          <CompanyName>{getCompanyName(product.companyId)}</CompanyName>
          <Price>{product.price}</Price>
          <Category>{product.category}</Category>
          <BodyLocation>{product.body_location}</BodyLocation>
        </Description>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const ContentWrapper = styled.div`
  display: flex;
`;

const ProductImg = styled.div``;
const StyledImg = styled.img``;

const Description = styled.div``;

const OutOfStock = styled.div``;

const ItemName = styled.div``;
const CompanyName = styled.div``;
const Price = styled.div``;
const Category = styled.div``;
const BodyLocation = styled.div``;

export default ProductDetails;
