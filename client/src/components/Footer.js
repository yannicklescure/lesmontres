import styled from "styled-components";
import AboutUsBanner from "./AboutUsBanner";
import SocialsBanner from "./SocialsBanner";
import { COLORS } from "../constants";

const Footer = () => {
  return (
    <FooterWrapper>
      <AboutUsBanner />
      <SocialsBanner />
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.div``;
