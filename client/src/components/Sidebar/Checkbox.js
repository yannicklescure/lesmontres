import { useState } from "react";
import styled from "styled-components";

const Checkbox = ({company, handleChecked}) => {
  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    const displayed = !checked;
    const _id = company[0]._id;
    setChecked(displayed);
    handleChecked({ _id, displayed });
  }

  return (
    <StyledCheckBox>
      <input 
        type="checkbox" 
        id={company[0]._id}
        name={company[0].name} 
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={company[0]._id}>{company[0].name}</label>
    </StyledCheckBox>
  )
}

const StyledCheckBox = styled.div`
  display: flex;
  align-items: center;
  & input {
    height: 18px;
    margin-right: 8px;
  }
`;

export default Checkbox;