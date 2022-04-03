import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { COLORS } from "../constants";
import { WishListContext } from "../contexts/WishListContext";
import WishList from "./WishList";

const WishListBar = () => {
  const {
    state: { isWishListBarOpen },
    actions: { openWishListBar, closeWishListBar },
  } = useContext(WishListContext);

  return (
    isWishListBarOpen && (
      <WishListBarContainer>
        <CloseIcon
          color={`${COLORS.dark}`}
          onClick={() => {
            closeWishListBar();
          }}
        />
        <WishList />
      </WishListBarContainer>
    )
  );
};
export default WishListBar;

const WishListBarContainer = styled.div`
  position: absolute;
  margin-top: 85px;
  top: 0;
  right: 0;
  height: 100vh;
  background: white;
  width: 30%;
  z-index: 999;
  transition: top ease 5s;
  box-shadow: 0px 68px 207px 200px rgba(0, 0, 0, 0.65);
`;

const CloseIcon = styled(AiOutlineClose)`
  font-size: 18px;
  position: absolute;
  right: 3%;
  top: 25px;
  cursor: pointer;
`;
