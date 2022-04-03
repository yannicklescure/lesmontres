import styled from "styled-components";
import { COLORS } from "../../constants";
import {
  AiOutlinePhone,
  AiOutlineMail,
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <MainWrapper>
      <AboutUs>
        <h1>About Us</h1>
        <div>
          Lorem ipsum dolor sit amet. Ut perferendis rerum hic cupiditate
          necessitatibus est quia iure qui velit unde et error tenetur ut
          corrupti minima.
        </div>
      </AboutUs>
      <Contact>
        <h1>Contact</h1>
        <div>
          <div>
            <FiMapPin />
            <span>123 Saint Laurent, Montreal QC, H3B 2YJ</span>
          </div>
          <div>
            <AiOutlinePhone />
            <span>(514)-908-6713</span>
          </div>
          <div>
            <AiOutlineMail />
            <span>info@lesmontres.ca</span>
          </div>
        </div>
      </Contact>
      <Newsletter>
        <h1>Newsletter</h1>
        <div>Sign up to receive 10% off your next purchase and a lifetime of emails in your junk folder!</div>
      </Newsletter>
      <FollowUs>
        <h1>Follow Us</h1>
        <SocialsIcons>
          <AiFillFacebook size="23" />
          <AiFillTwitterCircle size="23" />
          <AiFillInstagram size="23" />
        </SocialsIcons>
      </FollowUs>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  width: 100vw;
  height: 250px;
  background-color: ${COLORS.darker};
  color: white;
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
  display: flex;
`;

const AboutUs = styled.div`
  border: 1px solid ${COLORS.grey};
  width: 25vw;
`;

const Contact = styled.div`
  border: 1px solid ${COLORS.grey};
  width: 25vw;
`;

const Newsletter = styled.div`
  border: 1px solid ${COLORS.grey};
  width: 25vw;
`;

const FollowUs = styled.div`
  border: 1px solid ${COLORS.grey};
  width: 25vw;
`;

const SocialsIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export default Footer;
