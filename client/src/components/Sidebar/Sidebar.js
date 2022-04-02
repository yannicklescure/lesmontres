import styled from "styled-components";
import { COLORS } from "../../constants";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { BsSmartwatch } from 'react-icons/bs';
import { AiFillCaretRight, AiFillCaretDown } from 'react-icons/ai';
import Checkbox from "./Checkbox";
import { useState } from "react";

const Sidebar = ({companies, handleChecked}) => {
  const location = useLocation();
  // console.log(location);

  const params = useParams();
  const category = params.category;

  const [isShown, setIsShown] = useState(false);

  const handleClick = () => {
    setIsShown(!isShown);
  }

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
        <StyledTitleBtn onClick={handleClick}><div>Companies</div><div>{
          !isShown ? <AiFillCaretRight /> : <AiFillCaretDown />
          }</div></StyledTitleBtn>
        <InputBox isShown={isShown}>
          { companies.length > 0 &&
            companies.map(company => (
              <Checkbox key={company._id} company={company} handleChecked={handleChecked} />
            ))
          }
        </InputBox>
      <StyledTitleBtn>Filter</StyledTitleBtn>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  /* position: absolute; */
  min-height: calc(100vh - 85px - 47px);
  border-right: 1px solid ${COLORS.secondary};
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const StyledTitle = styled.div`
  margin: 12px 0;
  font-weight: bold;
  color: ${COLORS.dark};
  
  & span:first-child {
    margin-right: 8px;
  }
`;

const StyledTitleBtn = styled.button`
  font-weight: bold;
  color: ${COLORS.dark};
  border: none;
  background: none;
  outline: none;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  margin: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  & div:first-child {
    margin-right: 4px;
  }
  & div:last-child {
    display: flex;
    align-items: center;
  }
`;

const InputBox = styled.div`
  display: ${({isShown}) => isShown ? 'block' : 'none'};
  transition: all 300ms ease;
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