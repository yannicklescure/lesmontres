import styled from "styled-components";

const SubNavbar = () => {

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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-between;
  gap: 100px;
`;

export default SubNavbar;