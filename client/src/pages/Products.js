import { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import { ItemsContext } from "../contexts/ItemsContext";

const Products = () => {
  const params = useParams();
  console.log(params);
  const category = params?.category !== undefined ? params.category : 'fitness'
  
  const {
    state: {
      hasLoaded,  
      items,
    }
  } = useContext(ItemsContext);


  if (!hasLoaded) {
    return <Loading size="32" />
  }

  console.log(category);
  const products = items.filter(item => item.category.toLowerCase() === category);

  return (
    <Wrapper>
      {
        products.map(product => (
          <div key={product._id}>
            <StyledImg src={product.imageSrc} alt={product._id} width="96" height="96" />
          </div>
        ))
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
`;

const StyledImg = styled.img`
  /* width: ${({width}) => width + 'px'}; */
  /* height: ${({height}) => height + 'px'}; */
  object-fit: contain;
`;

export default Products;