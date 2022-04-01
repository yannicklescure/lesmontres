import styled from "styled-components";
import { COLORS } from "../constants";

const MainBanner = () => {
  return (
    <MainWrapper>
      <TextArea>
        <MainHeading>Timeless Smartwatches and Fitness Trackers.</MainHeading>
        <SubHeading>
          And other random sporty outside stuff labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </SubHeading>
      </TextArea>

      <ShopNowBtn>SHOP NOW</ShopNowBtn>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  /* border: 2px solid red; */
  /* background-color: black; */
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  min-height: calc(100vh - 85px - 47px);
  position: relative;
  font-family: Poppins;
`;

const TextArea = styled.div`
  width: 500px;
`;

const MainHeading = styled.h1`
  font-size: 65px;
  color: white;
  margin-left: 100px;
  padding: 75px 0 25px 0;
`;

const SubHeading = styled.div`
  font-weight: regular;
  color: grey;
  margin-left: 100px;
  padding-bottom: 25px;
`;

const ShopNowBtn = styled.button`
  margin-left: 100px;
  background-color: ${COLORS.darker};
  border: none;
  opacity: 0.75;
  font-size: 12px;
  color: ${COLORS.light};
  padding: 18px;
  width: 180px;
  transition: all 400ms ease;
`;

export default MainBanner;
