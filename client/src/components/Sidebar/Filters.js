import { useState } from "react";
import styled from "styled-components";
import Checkbox from "./Checkbox";
import { AiFillCaretRight, AiFillCaretDown } from 'react-icons/ai';
import { COLORS } from "../../constants";

const Filters = ({filters, handleChecked, name}) => {

  const [isShown, setIsShown] = useState(false);
  
  return (
    <>
      <StyledTitleBtn onClick={() => setIsShown(!isShown)}>
        <div>{name}</div>
        <div>{ !isShown ? <AiFillCaretRight /> : <AiFillCaretDown /> }</div>
      </StyledTitleBtn>
      <InputBox isShown={isShown}>
        { filters.length > 0 &&
          filters.map(filter => (
            <Checkbox key={filter._id} name={name} filter={filter} handleChecked={handleChecked} />
          ))
        }
      </InputBox>
    </>
  )
}

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

export default Filters;