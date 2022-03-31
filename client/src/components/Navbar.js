import styled from 'styled-components';
import { BsSmartwatch, BsCart, BsCartFill, BsFillPersonFill } from 'react-icons/bs';
import { COLORS } from '../constants';
import SubNavbar from './SubNavbar';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <Wrapper>
        <Brand>
          <BsSmartwatch />
          <StyledLink to="/">Les montres</StyledLink>
        </Brand>
        <StyledInput placeholder="Search your dream watch" />
        <Container>
          <BsCart />
          <BsCartFill />
          <BsFillPersonFill />
        </Container>
      </Wrapper>
      <SubNavbar />
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${COLORS.dark};
  color: ${COLORS.light};
  height: 75px;
  padding: 16px;
`;

const Brand = styled.div`
  font-size: 40px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledLink = styled(NavLink)`
  font-family: 'Yeseva One', cursive;
  font-size: 32px;
  text-decoration: none;
  color: ${COLORS.light};
  transition: all 400ms ease;

  &:hover {
    color: ${COLORS.grey};
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const StyledInput = styled.input`
  border: 1px solid ${COLORS.secondary};
  outline: none;
`;

// const StyledLink = styled.div`
//   text-decoration: none;
// `;
// const StyledBtn = styled.div`
//   background-color: ${COLORS.secondary};
//   color: ${COLORS.light};
//   margin-left: 12px;
//   /* border: 1px solid ${COLORS.purple}; */
//   padding: 8px 12px;
//   border-radius: 4px;
//   transition: all 400ms ease;
//   cursor: pointer;

//   &:hover {
//     background-color: ${COLORS.purple};
//   }
// `;

export default Navbar;