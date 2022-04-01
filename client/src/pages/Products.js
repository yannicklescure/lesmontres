import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";
import { COLORS } from "../constants";
import { ItemsContext } from "../contexts/ItemsContext";
import { CategoriesContext } from "../contexts/CategoriesContext";

const Products = () => {
  const params = useParams();
  console.log(params);
  const category = params?.category !== undefined ? params.category : "fitness";

  const {
    state: { items },
  } = useContext(ItemsContext);

  const {
    localStorage,
    state: { hasLoaded, categories },
    actions: { updateCategories, loadingCategories },
  } = useContext(CategoriesContext);

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [companiesIds, setCompaniesIds] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    setForceUpdate(forceUpdate + 1);
    // console.log(category);
    // console.log(localStorage);
    loadingCategories();
    // console.log('hasLoaded ' + hasLoaded);

    const thisCategory = localStorage.find((el) => el.name === category);
    // console.log(thisCategory);
    if (thisCategory) {
      setCompanies(thisCategory.companies);
      setAllProducts(thisCategory.items);
      setProducts(thisCategory.items);
    } else {
      setCompanies([]);
      setAllProducts([]);
      setProducts([]);
    }

    fetch(`/api/companies?category=${category}`)
      .then((res) => res.json())
      .then((response) => {
        // console.log(response);
        setCompaniesIds(response.data.map((item) => item._id));
        setCompanies(response.data);
        const copy = categories;
        // console.log(copy);
        copy.find((el) => el.name === category).companies = response.data;
        const filteredItems = items.filter(
          (item) => item.category.toLowerCase() === category
        );
        copy.find((el) => el.name === category).items = filteredItems;
        setAllProducts(filteredItems);
        setProducts(filteredItems);
        updateCategories({ categories: copy });
        // console.log(copy);
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line
  }, [category]);

  if (!hasLoaded) {
    return <Loading size="32" />;
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
    } else {
      const position = copy.findIndex((id) => id === company._id);
      // console.log(position);
      copy.splice(position, 1);
      setCompaniesIds(copy);
      // console.log(copy);
    }
    // console.log(copy.length);
    const productsToDisplay = [];
    copy.forEach((id) => {
      const filteredProducts = allProducts.filter(
        (product) => product.companyId === id
      );
      filteredProducts.forEach((filteredProduct) =>
        productsToDisplay.push(filteredProduct)
      );
    });
    console.log(productsToDisplay);
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
          // <ProductWrapper>
          <ProductWrapper>
            <ImgWrapper>
              <StyledImg
                key={product._id}
                src={product.imageSrc}
                alt={product._id}
              />
            </ImgWrapper>
            <Description>
              <ItemName>{product.name}</ItemName>
              <CompanyName>{getCompanyName(product.companyId)}</CompanyName>
              <Price>{product.price}</Price>
            </Description>
          </ProductWrapper>
          // </ProductWrapper>
        ))}
      </ProductsSection>
    </PageWrapper>
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
  justify-content: center;
  gap: 30px;
`;

const ProductWrapper = styled.div`
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

export default Products;
