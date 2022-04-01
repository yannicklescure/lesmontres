import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";
import { COLORS } from "../constants";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { ItemsContext } from "../contexts/ItemsContext";

const Products = () => {
  const params = useParams();
  console.log(params);
  const category = params?.category !== undefined ? params.category : 'fitness'
  
  const {
    state: {
      items,
    }
  } = useContext(ItemsContext);
  
  const {
    localStorage,
    state: {
      hasLoaded,
      categories,
    },
    actions: {
      updateCategories,
      loadingCategories
    }
  } = useContext(CategoriesContext);

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [companiesIds, setCompaniesIds] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    let unmounted = false;
    setForceUpdate(forceUpdate + 1);
    // console.log(category);
    // console.log(localStorage);
    loadingCategories();
    // console.log('hasLoaded ' + hasLoaded);
    
    const thisCategory = localStorage.find(el => el.name === category);
    // console.log(thisCategory);
    if (thisCategory) {
      setCompanies(thisCategory.companies);
      setAllProducts(thisCategory.items);
      setProducts(thisCategory.items);
    }
    else {
      setCompanies([]);
      setAllProducts([]);
      setProducts([]);
    }

    fetch(`/api/companies?category=${category}`)
      .then((res) => {
        if (!unmounted) return res.json();      
      })
      .then((response) => {
        if (!unmounted) {
          // console.log(response);
          setCompaniesIds(response.data.map(item => item._id));
          setCompanies(response.data);
          const copy = categories;
          // console.log(copy);
          copy.find(el => el.name === category).companies = response.data;
          const filteredItems = items.filter(item => item.category.toLowerCase() === category);
          copy.find(el => el.name === category).items = filteredItems;
          setAllProducts(filteredItems);
          setProducts(filteredItems);
          updateCategories({categories: copy});
          // console.log(copy);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      unmounted = true;
    }

    // eslint-disable-next-line
  }, [category])


  if (!hasLoaded) {
    return <Loading size="32" />
  }

  // console.log(categories);

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
    // console.log(productsToDisplay);
    setProducts(productsToDisplay.sort((a,b) => a._id - b._id));
  }

  const getCompanyName = (id) => {
    // console.log(id);
    const shadow = companies.find(company => company._id === id);
    // console.log(shadow);
    return shadow ? shadow.name : null;
  }

  if (companies.length === 0) return <Loading />

  return (
    <Wrapper>
      <Sidebar companies={companies} handleChecked={handleChecked} />
      <Container forceUpdate={forceUpdate}>
        {
          products.map(product => (
            <div key={product._id}>
              <StyledImg src={product.imageSrc} alt={product._id} width="96" height="96" />
              <div>{getCompanyName(product.companyId)}</div>
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