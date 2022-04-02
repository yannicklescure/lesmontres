import styled from "styled-components";
import { COLORS } from "../constants";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";

const SocialsBanner = () => {
  return (
    <MainWrapper>
      <ContentWrapper>
        <CopyrightText>© LesMontres</CopyrightText>
        <SocialsIcons>
          <AiFillFacebook size="20" />
          <AiFillTwitterCircle size="20" />
          <AiFillInstagram size="20" />
        </SocialsIcons>
      </ContentWrapper>
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

const ContentWrapper = styled.div`
  /* border: 2px solid red; */
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 100px 0 100px;
`;

const CopyrightText = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 12px;
  letter-spacing: 1px;
`;

const SocialsIcons = styled.div`
  /* border: 2px solid yellow; */
  display: flex;
  align-items: center;
  gap: 5px;
`;

export default SocialsBanner;
