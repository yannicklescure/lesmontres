import { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "../components/Loading";

const Products = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then((response) => {
        console.log(response);
        setProducts(response.data);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line
  }, []);

  if (products.length === 0) {
    return <Loading size="32" />
  }

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
`;

const StyledImg = styled.img`
  /* width: ${({width}) => width + 'px'}; */
  /* height: ${({height}) => height + 'px'}; */
  object-fit: contain;
`;

export default Products;