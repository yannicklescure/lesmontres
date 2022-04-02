import { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

const Checkbox = ({filter, handleChecked}) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const displayed = !checked;
    const _id = filter._id;
    setChecked(displayed);
    handleChecked({ _id, displayed });
  }

  return (
    <StyledCheckBox>
      <input 
        type="checkbox" 
        id={filter._id}
        name={filter.name} 
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={filter._id}>{filter.name}</label>
    </StyledCheckBox>
  )
}

const StyledCheckBox = styled.div`
  display: flex;
  align-items: center;
  
  & input, label {
    cursor: pointer;

  }

  & label:hover {
    color: ${COLORS.secondary};
  }

  & input {
    height: 18px;
    margin-right: 8px;
  }
`;

export default Checkbox;