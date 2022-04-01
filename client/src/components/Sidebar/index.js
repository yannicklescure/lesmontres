import styled from "styled-components";
import { COLORS } from "../../constants";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { BsSmartwatch } from 'react-icons/bs';
import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";

const Sidebar = ({companies, handleChecked}) => {
  const location = useLocation();
  console.log(location);

  const params = useParams();
  const category = params.category;

  return (
    <Wrapper>
        <StyledTitle>
          <StyledLink 
            to={`/products/${category}`}
            active={location.pathname === `/products/${category}` ? 'true' : undefined}
          >
            <span><BsSmartwatch /></span>
            <span>{category.includes('and') ? category.replace('and', '&').toUpperCase() : category.toUpperCase()}</span>
          </StyledLink>
        </StyledTitle>
        <StyledTitle>Companies</StyledTitle>
        { companies.length > 0 &&
          companies.map(company => (
            <Checkbox key={company._id} company={company} handleChecked={handleChecked} />
          ))
        }
      <StyledTitle>Filter</StyledTitle>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  /* position: absolute; */
  min-height: calc(100vh - 85px - 47px);
  border-right: 1px solid ${COLORS.secondary};
  padding: 16px;
`;

const StyledTitle = styled.div`
  margin: 12px 0;
  font-weight: bold;
  color: ${COLORS.dark};
  
  & span:first-child {
    margin-right: 8px;
  }
  `;

const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${({active}) => active ? COLORS.dark : COLORS.secondary};
  font-weight: ${({active}) => active ? 'bold' : 'normal'};
  text-decoration: none;

  &:hover {
    color: ${COLORS.dark};
  }
`;

export default Sidebar;