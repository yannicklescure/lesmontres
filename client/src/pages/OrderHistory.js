import { useContext } from "react";
import styled from "styled-components";
import ProductCard from "../components/ProductCard";
import { COLORS } from "../constants";
import { CompaniesContext } from "../contexts/CompaniesContext";
import { UserContext } from "../contexts/UserContext";

const OrderHistory = () => {

  const {
    state: { user },
  } = useContext(UserContext);

  const {
    state: {
      companies,
    },
  } = useContext(CompaniesContext);

  const getCompanyName = (id, category) => {
    console.log(id);
    console.log(category);
    console.log(companies);
    if (companies[category]) {
      const position = companies[category].findIndex((company) => company._id === id);
      return position !== -1 ? companies[category].find((company) => company._id === id).name : null;
    }
    return;
  };

  return (
    <Wrapper>
      <Title>Your orders</Title>
      <Container>
        {
          user.purchasedHistory.map(product => (
            <ProductCard
              product={product}
              getCompanyName={getCompanyName}
              key={product._id}
            />
          ))
        }
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 900px;
  min-height: calc(100vh - 85px - 47px);
  max-width: 1320px;
  margin: 0 auto;
  padding: 16px 0;
  font-size: 16px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 32px;
`;

const Title = styled.h1`
  font-size: 32px;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${COLORS.grey};
`;

export default OrderHistory;