import styled from "styled-components";
import { COLORS } from "../../constants";

const SocialsBanner = () => {
  return (
    <MainWrapper>
        <CopyrightText>© LesMontres</CopyrightText>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  /* border: 2px solid red; */
  color: white;
  background-color: ${COLORS.secondary};
  width: 100vw;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const CopyrightText = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 12px;
  letter-spacing: 1px;
`;

export default SocialsBanner;
