import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../constants";
import { ItemsContext } from "../contexts/ItemsContext";
import Loading from "./Loading";

const SubNavbar = () => {

  const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   fetch('/api/items?categories=true')
  //     .then(res => res.json())
  //     .then((response) => {
  //       console.log(response);
  //       setCategories(response.data);
  //     })
  //     .catch(err => console.log(err));
  //   // eslint-disable-next-line
  // }, []);

  const {
    state: {
      items,
    }
  } = useContext(ItemsContext);

  useEffect(() => {
    let tmp = [];
    items.forEach((item) => {
      if (!tmp.includes(item.category)) tmp.push(item.category);
    });
    setCategories(tmp);
    // eslint-disable-next-line
  }, []);

  if (categories.length === 0) return <><Loading size="32" /></>

  return (
    <Wrapper>
      {
        categories.map(category => (
          <StyledLink 
            key={category} 
            to={`/products/${category.toLowerCase()}`}
          >{category.includes('and') ? category.replace('and', '&') : category}</StyledLink>
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