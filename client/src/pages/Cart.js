import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CartItem from "../components/CartItem";
import { UserContext } from "../contexts/UserContext";
import { AiOutlineClose } from "react-icons/ai";
import { ItemsContext } from "../contexts/ItemsContext";
const Cart = () => {
  const {
    state: {
      user: { cartArray },
    },
  } = useContext(UserContext);

  const [discount, setDiscount] = useState(true);

  console.log(cartArray);
  return (
    <CartDiv>
      {discount && (
        <DiscountDiv>
          <DiscountWrapper>
            <p>Save Up to 25%</p>
            <Link>Shop All Our Latest Watches</Link>
          </DiscountWrapper>
          <AiOutlineClose onClick={() => setDiscount(false)} />
        </DiscountDiv>
      )}
      <CartTitle>Your Cart :</CartTitle>
      {cartArray.map((item) => (
        <CartItem key={item._id} qty={item.qty} id={item._id} />
      ))}
    </CartDiv>
  );
};
export default Cart;

const CartDiv = styled.div`
  padding: 75px 150px;
`;
const DiscountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const DiscountDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 50%;
  background: #f5f5f5;
  padding: 20px;
  margin: 0 0 20px;
`;
const CartTitle = styled.h1`
  margin: 20px 0;
`;
