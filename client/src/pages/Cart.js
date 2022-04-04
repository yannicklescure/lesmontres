import { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import CartItem from "../components/CartItem";
import { UserContext } from "../contexts/UserContext";
import { IoCloseOutline } from "react-icons/io5";
// import { ItemsContext } from "../contexts/ItemsContext";
import CartPayment from "../components/CartPayment";
import { COLORS } from "../constants";

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
  const [successPayment, setSuccessPayment] = useState(false);

  useEffect(() => {
    const initItemsTotals = user.cartArray.map(item => ({
      _id: item._id, 
      total: item.price.replace('$', ''),
      
    }));
    getTotal2Pay(initItemsTotals);
    setItemsTotals(initItemsTotals);
    // eslint-disable-next-line
  }, []);

  const getTotal2Pay = (copyItemsTotals) => {
    console.log(copyItemsTotals);
    let sum = 0;
    copyItemsTotals.forEach(item => {
      console.log(item.total);
      sum += parseFloat(item.total);
    });
    console.log(sum);
    const subtotal = parseFloat(sum).toFixed(2);
    const shipping = parseFloat(8).toFixed(2);
    const taxes = parseFloat(subtotal * 0.15).toFixed(2);
    const total = parseFloat(Number(subtotal) + Number(shipping) + Number(taxes)).toFixed(2);
    console.log(total);
    setTotal2Pay({
      subtotal,
      shipping,
      taxes,
      total
    });
  }

  const handleTotal2Pay = (item) => {
    console.log(item);
    let copyItemsTotals = itemsTotals;
    // TO DO: Init cart with total on load
    const position = copyItemsTotals.findIndex(el => el._id === item._id);
    copyItemsTotals.splice(position,1, item);
    setItemsTotals(copyItemsTotals);
    console.log(copyItemsTotals);
    getTotal2Pay(copyItemsTotals);
  }
  
  return (
    <Wrapper successPayment={successPayment}>
      {
        successPayment &&
        <TextAlert>
          <div>Thank you for shopping with us.</div>
          <TextAlertBtn onClick={() => setSuccessPayment(false)}><IoCloseOutline /></TextAlertBtn>
        </TextAlert>
      }
      {
        user.cartArray.length > 0 
          ? <>
            <div>
              <CartTitle>Shopping Cart</CartTitle>
              {user.cartArray.map((item) => (
                <CartItem key={item._id} qty={item.qty} id={item._id} handleTotal2Pay={handleTotal2Pay} />
              ))}
            </div>
            <CartPayment total2Pay={total2Pay} setSuccessPayment={setSuccessPayment} />
          </>
          : <div>Your cart is empty.</div>
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  ${({successPayment}) => successPayment ? 'flex-direction: column;' : ''}  
  align-items: ${({successPayment}) => successPayment ? 'center' : 'flex-start'};
  margin: 16px auto;
`;

const CartTitle = styled.h1`
  font-size: 32px;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${COLORS.grey};
`;

const TextAlert = styled.div`
  margin-bottom: 16px;
  padding: 16px 32px;
  background-color: ${COLORS.success};
  color: ${COLORS.light};
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TextAlertBtn = styled.button`
  padding: 0;
  border: none;
  outline: none;
  background: none;
  font-size: 16px;
  color: ${COLORS.light};
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: ${COLORS.grey};
  }
`;

export default Cart;
