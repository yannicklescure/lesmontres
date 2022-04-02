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
      <CopyrightText>© LesMontres</CopyrightText>
      <SocialsIcons>
        <AiFillFacebook />
        <AiFillTwitterCircle />
        <AiFillInstagram />
      </SocialsIcons>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  /* border: 2px solid red; */
  color: white;
  background-color: ${COLORS.secondary};
  display: flex;
  align-items: flex-end;
`;

const CopyrightText = styled.div`
  margin-left: 100px;
  /* border: 2px solid blue; */
  display: flex;
  align-items: center;
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  height: 50px;
`;

const SocialsIcons = styled.div`
  display: flex;
  align-items: center;
`;

export default SocialsBanner;
