import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../constants";
import { CategoriesContext } from "../contexts/CategoriesContext";
import Loading from "./Loading";

const SubNavbar = () => {  

  const {
    state: {
      hasLoaded,
      categories,
    },
  } = useContext(CategoriesContext);  

  if (!hasLoaded) return <><Loading size="32" /></>

  return (
    <Wrapper>
      {
        categories.map(category => (
          <StyledLink 
            key={category.name} 
            to={`/products/${category.name.toLowerCase()}`}
          >{category.name.includes('and') ? category.name.replace('and', '&') : category.name}</StyledLink>
        ))
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 35px;
  background-color: ${COLORS.dark};

  /* background-color: none; */
  padding: 17px;
  border-bottom: 0.5px solid ${COLORS.grey};
`;

const StyledLink = styled(NavLink)`
  font-family: Poppins;
  font-size: 12px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${COLORS.light};
  transition: all 400ms ease;

  &:hover {
    color: ${COLORS.grey};
    cursor: pointer;
  }
`;

export default SubNavbar;