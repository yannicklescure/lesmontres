import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";
import { COLORS } from "../constants";
import { ItemsContext } from "../contexts/ItemsContext";
import { CategoriesContext } from "../contexts/CategoriesContext";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const params = useParams();
  // console.log(params);
  const category = params?.category !== undefined ? params.category : "fitness";

  const {
    state: {
      hasLoaded, 
      items,
    },
  } = useContext(ItemsContext);

  const {
    localStorage,
    state: { 
      categories 
    },
    actions: { 
      updateCategories, 
      loadingCategories,
    },
  } = useContext(CategoriesContext);

  const [products, setProducts] = useState([]);
  const [companiesIds, setCompaniesIds] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    let unmounted = false;
    setForceUpdate(forceUpdate + 1);
    loadingCategories();

    // console.log(localStorage);
    const thisCategory = localStorage.find((el) => el.name === category);
    console.log(thisCategory);
    if (thisCategory) {
      setCompanies(thisCategory.companies);
      setProducts(thisCategory.items);
    } else {
      setCompanies([]);
      setProducts([]);
    }

    fetch(`/api/companies?category=${category}`)
      .then((res) => {
        if (!unmounted) return res.json();
      })
      .then((response) => {
        if (!unmounted) {
          setCompanies(response.data);
          const copy = categories;
          copy.find((el) => el.name === category).companies = response.data;
          const filteredItems = items.filter(
            (item) => item.category.toLowerCase() === category
          );
          copy.find((el) => el.name === category).items = filteredItems;
          setProducts(filteredItems);
          updateCategories({ categories: copy });
        }
      })
      .catch((err) => console.log(err));

    return () => {
      unmounted = true;
    };
    // eslint-disable-next-line
  }, [category]);

  if (!hasLoaded) {
    return <Loading size="32" />;
  }

  const handleChecked = (company) => {
    let copy = companiesIds;
    if (company.displayed) {
      copy.push(company._id);
      setCompaniesIds(copy);
    } else {
      const position = copy.findIndex((id) => id === company._id);
      copy.splice(position, 1);
      setCompaniesIds(copy);
    }
    let productsToDisplay = [];
    const allProducts = categories.find((el) => el.name === category).items;
    if (companiesIds.length === 0) {
      productsToDisplay = allProducts;
    }
    else {
      copy.forEach((id) => {
        const filteredProducts = allProducts.filter(
          (product) => product.companyId === id
        );
        filteredProducts.forEach((filteredProduct) =>
          productsToDisplay.push(filteredProduct)
        );
      });
    }
    setProducts(productsToDisplay.sort((a, b) => a._id - b._id));
  };

  const getCompanyName = (id) => {
    return companies.find((company) => company._id === id).name;
  };

  if (companies.length === 0) return <Loading />;

  return (
    <PageWrapper>
      <Sidebar companies={companies} handleChecked={handleChecked} />
      <ProductsSection forceUpdate={forceUpdate}>
        {products.map((product) => (
          <ProductCard
            product={product} 
            getCompanyName={getCompanyName} 
            key={product._id}
          />
        ))}
      </ProductsSection>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  position: relative;
  margin-bottom: 16px;
  border-bottom: 1px solid ${COLORS.secondary};
  background-color: white;
`;

const ProductsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
  justify-content: center;
  gap: 30px;
`;

export default Products;
