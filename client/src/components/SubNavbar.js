import styled from "styled-components";

const SubNavBar = () => {

  // fetch categories

  return (
    <Wrapper>
      <div>Category</div>
      <div>Category</div>
      <div>Category</div>
      <div>Category</div>
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
