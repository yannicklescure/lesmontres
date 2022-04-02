import styled from "styled-components";

const NewsletterBanner = () => {
  return <MainWrapper>sign up to our newsletter</MainWrapper>;
};

const MainWrapper = styled.div`
  background-color: grey;
  width: 100vw;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export default NewsletterBanner;
