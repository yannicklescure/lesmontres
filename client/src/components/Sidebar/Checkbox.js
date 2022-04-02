import { useState } from "react";
import styled from "styled-components";

const Checkbox = ({company, handleChecked}) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const displayed = !checked;
    const _id = company._id;
    setChecked(displayed);
    handleChecked({ _id, displayed });
  }

  return (
    <StyledCheckBox>
      <input 
        type="checkbox" 
        id={company._id}
        name={company.name} 
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={company._id}>{company.name}</label>
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