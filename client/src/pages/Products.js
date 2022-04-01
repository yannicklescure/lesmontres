import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";
import { COLORS } from "../constants";
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

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [companiesIds, setCompaniesIds] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    setCompanies([]);
    fetch(`/api/companies?category=${category}`)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setCompaniesIds(response.data.map(item => item[0]._id));
        setCompanies(response.data);
      })
      .catch((err) => console.log(err));

    const tmp = items.filter(item => item.category.toLowerCase() === category);
    setAllProducts(tmp);
    setProducts(tmp);
    // eslint-disable-next-line
  }, [category])


  if (!hasLoaded) {
    return <Loading size="32" />
  }

  console.log(category);

  const handleChecked = (company) => {
    // console.log(company);
    let copy = companiesIds;
    // console.log(company.displayed);
    if (company.displayed) {
      copy.push(company._id);
      setCompaniesIds(copy);
      // console.log(copy);
    }
    else {
      const position = copy.findIndex(id => id === company._id);
      // console.log(position);
      copy.splice(position, 1);
      setCompaniesIds(copy);
      // console.log(copy);
    }
    // console.log(copy.length);
    const productsToDisplay = [];
    copy.forEach(id => {
      const filteredProducts = allProducts.filter(product => product.companyId === id);
      filteredProducts.forEach(filteredProduct => productsToDisplay.push(filteredProduct));
    });
    console.log(productsToDisplay);
    setProducts(productsToDisplay.sort((a,b) => a._id - b._id));
  }

  return (
    <Wrapper>
      <Sidebar companies={companies} handleChecked={handleChecked} />
      <Container>
        {
          products.map(product => (
            <div key={product._id}>
              <StyledImg src={product.imageSrc} alt={product._id} width="96" height="96" />
            </div>
          ))
        }
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  position: relative;
  margin-bottom: 16px;
  border-bottom: 1px solid ${COLORS.secondary};
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
`

const StyledImg = styled.img`
  /* width: ${({width}) => width + 'px'}; */
  /* height: ${({height}) => height + 'px'}; */
  object-fit: contain;
`;

export default Products;