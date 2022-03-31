import styled from 'styled-components';
import { BsSmartwatch, BsCart, BsCartFill, BsFillPersonFill } from 'react-icons/bs';
import { COLORS } from '../constants';

const Navbar = () => {
  return (
    <Wrapper>
      <Brand>
        <BsSmartwatch />
        <span>Les montres</span>
      </Brand>
      <StyledInput placeholder="Search your dream watch" />
      <Container>
        <BsCart />
        <BsCartFill />
        <BsFillPersonFill />
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${COLORS.grey};
  height: 75px;
  padding: 16px;
`;

const Brand = styled.div`
  font-size: 40px;
  display: flex;
  align-items: center;
  gap: 12px;

  & span {
    font-family: 'Yeseva One', cursive;
    font-size: 32px;
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