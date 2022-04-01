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

<<<<<<< HEAD
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
        setCompaniesIds(response.data.map((item) => item._id));
        setCompanies(response.data);
      })
      .catch((err) => console.log(err));

    const tmp = items.filter(
      (item) => item.category.toLowerCase() === category
    );
    setAllProducts(tmp);
    setProducts(tmp);
    // eslint-disable-next-line
  }, [category]);

=======
>>>>>>> master
  if (!hasLoaded) {
    return <Loading size="32" />;
  }

  console.log(category);
<<<<<<< HEAD

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
      <ProductsSection>
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
=======
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
>>>>>>> master
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
<<<<<<< HEAD
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

=======
  background-color: white;
`;

const StyledImg = styled.img`
  /* width: ${({ width }) => width + "px"}; */
  /* height: ${({ height }) => height + "px"}; */
  object-fit: contain;
`;

>>>>>>> master
export default Products;
