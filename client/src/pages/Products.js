import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";
import { COLORS } from "../constants";
import { ItemsContext } from "../contexts/ItemsContext";
import usePersistedState from "../hooks/usePersistedState";

const Products = () => {
  const params = useParams();
  console.log(params);
  const category = params?.category !== undefined ? params.category : "fitness";

  const {
    state: { hasLoaded, items },
  } = useContext(ItemsContext);

  if (!hasLoaded) {
    return <Loading size="32" />;
  }

  console.log(category);
  const products = items.filter(
    (item) => item.category.toLowerCase() === category
  );

  return (
    <Wrapper>
      {products.map((product) => (
        <div key={product._id}>
          <StyledImg
            src={product.imageSrc}
            alt={product._id}
            width="96"
            height="96"
          />
        </div>
      ))}
    </Wrapper>
  );
};

const PageWrapper = styled.div`
  /* border: 2px solid pink; */
  /* display: grid;
  grid-template-columns: 200px auto; */
  display: flex;
  position: relative;
  margin-bottom: 16px;
  border-bottom: 1px solid ${COLORS.secondary};
  background-color: white;
  /* padding: 50px; */
`;

const ProductsSection = styled.div`
  /* border-bottom: 1px solid ${COLORS.secondary}; */
  /* border: 2px solid green; */
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
  background-color: white;
`;

const StyledImg = styled.img`
  /* width: ${({ width }) => width + "px"}; */
  /* height: ${({ height }) => height + "px"}; */
  object-fit: contain;
`;

export default Products;
