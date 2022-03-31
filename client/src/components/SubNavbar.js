import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../constants";

const SubNavbar = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/items?categories=true')
      .then(res => res.json())
      .then((response) => {
        console.log(response);
        setCategories(response.data);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line
  }, []);

  if (categories.length === 0) return <></>

  return (
    <Wrapper>
      {
        categories.map(category => (
          <StyledLink key={category} to={`/products/${category.toLowerCase()}`}>{category}</StyledLink>
        ))
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  background-color: ${COLORS.light};
  padding: 16px;
  border-bottom: 1px solid ${COLORS.grey};
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
`;

export default SubNavbar;