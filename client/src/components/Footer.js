import styled from "styled-components";
import AboutUsBanner from "./AboutUsBanner";
import NewsletterBanner from "./NewsletterBanner";
import SocialsBanner from "./SocialsBanner";

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
