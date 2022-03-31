import styled from "styled-components";

const SubNavBar = () => {
  return (
    <Wrapper>
      <div>Products</div>
      <div>Products</div>
      <div>Products</div>
      <div>Products</div>
    </Wrapper>
  );
};

export default SubNavBar;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-between;
  gap: 100px;
`;
