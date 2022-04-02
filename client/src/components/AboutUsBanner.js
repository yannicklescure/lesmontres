import styled from "styled-components";
import { COLORS } from "../constants";

const AboutUsBanner = () => {
  return (
    <MainWrapper>
      <AboutUs>
        <h1>About Us</h1>
      </AboutUs>
      <Contact>
        <h1>Contact</h1>
      </Contact>
      <Newsletter>
        <h1>Newsletter</h1>
      </Newsletter>
      <FollowUs>Follow Us</FollowUs>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  width: 100vw;
  height: 300px;
  background-color: ${COLORS.darker};
  color: white;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  align-content: stretch;
`;

const AboutUs = styled.div`
  border: 1px solid ${COLORS.grey};
`;

const Contact = styled.div`
  border: 1px solid ${COLORS.grey};
`;

const Newsletter = styled.div`
  border: 1px solid ${COLORS.grey};
`;

const FollowUs = styled.div`
  border: 1px solid ${COLORS.grey};
`;

export default AboutUsBanner;
