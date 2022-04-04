import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../constants";
import bannerImg from "../assets/images/trackers.png";

const MainBanner = () => {
  return (
    <MainWrapper>
      <Container>
        <TextArea>
          <MainHeading>Timeless Smartwatches and Fitness Trackers.</MainHeading>
          <SubHeading>
            And other random sporty outside stuff labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </SubHeading>
        </TextArea>
        <ShopNowBtn to="/products/fitness">SHOP NOW</ShopNowBtn>
      </Container>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  min-height: 100vh;
  font-family: Poppins;
  background: url(${bannerImg}) no-repeat center center fixed;
  background-size: cover;
  position: relative;
  margin-top: -85px;
  left: 0;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  margin-left: 100px;
`;

const TextArea = styled.div`
  width: 500px;
`;

const MainHeading = styled.h1`
  font-size: 64px;
  color: white;
  margin: 0 0 24px 0;
`;

const SubHeading = styled.div`
  font-weight: regular;
  color: grey;
`;

const ShopNowBtn = styled(NavLink)`
  display: block;
  margin-top: 24px;
  background-color: ${COLORS.secondary};
  text-decoration: none;
  border: none;
  /* opacity: 0.75; */
  font-size: 14px;
  color: ${COLORS.light};
  padding: 20px 24px;
  width: fit-content;
  transition: all 400ms ease;

  &:hover {
    background-color: ${COLORS.dark};
  }
`;

export default MainBanner;
