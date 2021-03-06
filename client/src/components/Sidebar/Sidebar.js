import styled from "styled-components";
import { COLORS } from "../../constants";
import { useParams } from "react-router-dom";
import { BsSmartwatch } from "react-icons/bs";
import Filters from "./Filters";

const Sidebar = ({ bodyLocations, companies, handleChecked }) => {
  const params = useParams();
  const category = params.category;

  return (
    <Wrapper>
      <StyledTitle>
        <span>
          <BsSmartwatch />
        </span>
        <span>
          {category.includes("and")
            ? category.replace("and", "&").toUpperCase()
            : category.toUpperCase()}
        </span>
      </StyledTitle>
      <Filters
        name="Companies"
        filters={companies}
        handleChecked={handleChecked}
      />
      <Filters
        name="Body location"
        filters={bodyLocations}
        handleChecked={handleChecked}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* position: absolute; */
  min-height: calc(100vh - 85px - 47px);
  /* border-right: 1px solid ${COLORS.grey}; */
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${COLORS.light};
`;

const StyledTitle = styled.div`
  margin: 12px 0;
  font-weight: bold;
  color: ${COLORS.dark};

  & span:first-child {
    margin-right: 8px;
  }
`;

export default Sidebar;
