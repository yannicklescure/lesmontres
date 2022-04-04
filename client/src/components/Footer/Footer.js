import styled from "styled-components";
import { COLORS } from "../../constants";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillGoogleSquare,
} from "react-icons/ai";
import CopyrightBanner from "../CopyrightBanner";

const Footer = () => {
  return (
    <MainWrapper>
      <Container>
        <AboutUs>
          <h1>About Us</h1>
          <Lists>
            <List>Home</List>
            <List>Products</List>
            <List>Cart</List>
            <List>Pricing</List>
          </Lists>
        </AboutUs>
        <Seperator />
        <Contact>
          <h1>Help</h1>
          <Lists>
            <List>Shipping</List>
            <List>Discounts</List>
            <List>News Letter</List>
            <List>Status</List>
          </Lists>
        </Contact>
        <Seperator />

        <Contact>
          <h1>Contact</h1>
          <Lists>
            <List>1455 Boul de Maisonneuve O, Montréal, QC H3G 1M8</List>
            <List>(314) 750-4388</List>
            <List>LesMontres@gmail.com</List>
            <List>Contact Page</List>
          </Lists>
          <Address></Address>
        </Contact>
        <Seperator />

        <SocialWrapper>
          <h1>Follow Us</h1>
          <SocialContainer>
            <AiFillFacebook size="23" />
            <AiFillTwitterCircle size="23" />
            <AiFillInstagram size="23" />
            <AiFillGoogleSquare size="23" />
          </SocialContainer>
        </SocialWrapper>
      </Container>
      <CopyrightBanner />
    </MainWrapper>
  );
};
const SocialWrapper = styled.div`
  width: 25vw;
  display: grid;
  height: 50%;
`;
const MainWrapper = styled.div`
  max-width: 80%;
`;

const List = styled.li`
  margin: 10px 5px;
`;
const Lists = styled.ul`
  margin: 20px 0;
`;
const SocialContainer = styled.div`
  display: flex;
  gap: 10px;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, auto);
  grid-gap: 20px;
  padding: 0 40px;
  justify-items: center;
  align-items: center;
  width: 100vw;
  height: 250px;
  background-color: ${COLORS.darker};
  color: white;
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
`;
const Seperator = styled.hr`
  height: 40%;
  opacity: 0.2;
`;

const AboutUs = styled.div`
  width: 25vw;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Contact = styled.div`
  width: 25vw;
`;

const Address = styled.div`
  width: 25vw;
`;

export default Footer;
