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
  const [bodyLocations, setBodyLocations] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    let unmounted = false;
    setForceUpdate(forceUpdate + 1);
    loadingCategories();

    // console.log(localStorage);
    const thisCategory = localStorage.find((el) => el.name === category);
    // console.log(thisCategory);
    if (thisCategory) {
      setCompanies(thisCategory.companies);
      setProducts(thisCategory.items);
      setBodyLocations(thisCategory.bodyLocations);
    } else {
      setCompanies([]);
      setProducts([]);
      setBodyLocations([]);
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
          const theBodyLocations = [];
          filteredItems.forEach(item => {
            if (theBodyLocations.findIndex(el => el.name === item.body_location) === -1) theBodyLocations.push({
              _id: item.body_location,
              name: item.body_location,
            });
          });
          copy.find((el) => el.name === category).bodyLocations = theBodyLocations;
          // console.log(bodyLocations);
          setBodyLocations(theBodyLocations);
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

  const handleChecked = (data) => {
    console.log(data.name);
    const allProducts = categories.find((el) => el.name === category).items;

    // This function add/remove the elements ids to display
    const toggleItem = (data, arr, callback) => {
      data.displayed
        ? arr.push(data._id)
        : arr.splice(arr.findIndex((id) => id === data._id), 1);
      callback(arr);
      // return arr;
    }

    // This function set the elements to display
    const getProductsToDisplay = async () => {
      const filterProducts = (arr, key) => {
        if (arr.length === 0) return [];
        let dataFiltered = [];
        arr.forEach((el) => {
          dataFiltered = [...dataFiltered, ...allProducts.filter(
            (product) => product[key] === el
          )];
        });
        console.log(dataFiltered);
        return dataFiltered;
      };
      const promise1 = filterProducts(bodyParts, 'body_location');
      const promise2 = filterProducts(companiesIds, 'companyId');
      Promise.all([promise1, promise2]).then((values) => {
        let dataFiltered = [];
        if (values[0].length === 0) dataFiltered = values[1];
        else if (values[1].length === 0) dataFiltered = values[0];
        else {
          values[0].forEach(value => {
            values[1].forEach(item => {
              if(value === item) dataFiltered.push(item);
            });
          });
        }
        // const array = [...values[0], ...values[1]];
        // const dataFiltered = [...new Set(array)].sort((a, b) => a._id - b._id);
        console.log(dataFiltered);
        setProducts(dataFiltered);
      });
    }

    // Here we filter based on the checkbox type
    if (data.name === 'Body location') toggleItem(data, bodyParts, setBodyParts);
    if (data.name === 'Companies') toggleItem(data, companiesIds, setCompaniesIds);

    (bodyParts.length === 0 && companiesIds.length === 0)
      ? setProducts(allProducts)
      : getProductsToDisplay();
  };

  const getCompanyName = (id) => {
    return companies.find((company) => company._id === id).name;
  };

  if (companies.length === 0) return <Loading />;

  return (
    <PageWrapper>
      <Sidebar bodyLocations={bodyLocations} companies={companies} handleChecked={handleChecked} />
      <ProductsSection forceUpdate={forceUpdate}>
        {
          products.length > 0
          ? products.map((product) => (
              <ProductCard
                product={product} 
                getCompanyName={getCompanyName} 
                key={product._id}
              />
            ))
          : <>No result found.</>
        }
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
