import styled from "styled-components";
import AboutUsBanner from "./AboutUsBanner";
import SocialsBanner from "./SocialsBanner";
import { COLORS } from "../constants";
import NewsletterBanner from "./NewsletterBanner";

const Footer = () => {
  return (
    <FooterWrapper>
      <NewsletterBanner />
      <AboutUsBanner />
      <SocialsBanner />
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.div``;
