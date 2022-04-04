import styled from "styled-components";
import { COLORS } from "../constants";

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
  background-color: ${COLORS.darker};
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const CopyrightText = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 10px;
  letter-spacing: 1px;
`;

export default SocialsBanner;
