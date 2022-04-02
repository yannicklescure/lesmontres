import styled from "styled-components";
import Checkbox from "./Checkbox";

const Filters = ({filters, isShown, handleChecked}) => {
  return (
    <InputBox isShown={isShown}>
      { filters.length > 0 &&
        filters.map(filter => (
          <Checkbox key={filter._id} filter={filter} handleChecked={handleChecked} />
        ))
      }
    </InputBox>
  )
}

const InputBox = styled.div`
  display: ${({isShown}) => isShown ? 'block' : 'none'};
  transition: all 300ms ease;
`;

export default Filters;