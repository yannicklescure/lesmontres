import { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import CartItem from "../components/CartItem";
import { UserContext } from "../contexts/UserContext";
// import { AiOutlineClose } from "react-icons/ai";
// import { ItemsContext } from "../contexts/ItemsContext";
import CartPayment from "../components/CartPayment";

const Cart = () => {
  const {
    state: {
      user,
    },
  } = useContext(UserContext);

  const [total2Pay, setTotal2Pay] = useState({
    subtotal: 0,
    shipping: 0,
    taxes: 0,
    total: 0
  });
  const [itemsTotals, setItemsTotals] = useState(0);

  useEffect(() => {
    setItemsTotals(user.cartArray.map(item => ({_id: item._id, total: 0})));
  }, []);


  const handleTotal2Pay = (item) => {
    console.log(item);
    let copyItemsTotals = itemsTotals;
    // TO DO: Init cart with total on load
    const position = copyItemsTotals.findIndex(el => el._id === item._id);
    copyItemsTotals.splice(position,1, item);
    setItemsTotals(copyItemsTotals);
    console.log(copyItemsTotals);
    let sum = 0;
    copyItemsTotals.forEach(item => {
      sum += parseFloat(item.total);
    });
    const subtotal = parseFloat(sum).toFixed(2);
    const shipping = parseFloat(8).toFixed(2);
    const taxes = parseFloat(subtotal * 0.15).toFixed(2);
    const total = parseFloat(subtotal + shipping + taxes).toFixed(2);
    setTotal2Pay({
      subtotal,
      shipping,
      taxes,
      total
    });
  }
  
  return (
    <Wrapper>
      {
        user.cartArray.length > 0 
          ? <>
            <CartDiv>
              <CartTitle>Your Cart :</CartTitle>
              {user.cartArray.map((item) => (
                <CartItem key={item._id} qty={item.qty} id={item._id} handleTotal2Pay={handleTotal2Pay} />
              ))}
            </CartDiv>
            <CartPayment total2Pay={total2Pay} />
          </>
          : <div>Your cart is empty.</div>
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 16px auto;
`;

const CartDiv = styled.div`
  /* padding: 75px 150px; */
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

export default Cart;
