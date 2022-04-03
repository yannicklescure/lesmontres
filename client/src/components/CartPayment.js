import styled from "styled-components";

const CartPayment = ({total2Pay}) => {
  return (
    <Wrapper>
      <h1>Summary</h1>
      <h1>Do You have a Promo Code?</h1>
      <CartTotal>
        <p>Subtotal</p>
        <p>{total2Pay.subtotal}</p>
      </CartTotal>
      <CartTotal>
        <p>Shipping</p>
        <p>{total2Pay.shipping}</p>
      </CartTotal>
      <CartTotal>
        <p>Taxes</p>
        <strong>{total2Pay.taxes}</strong>
      </CartTotal>

      <CartFinal>
        <p>Total</p>
        <p>$ {total2Pay.total}</p>
      </CartFinal>
      <CartBuy>Buy</CartBuy>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 62px;
  display: flex;
  flex-direction: column;
`;
const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;
const CartFinal = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid lightgray;
  padding: 10px 0;
  border-bottom: 1px solid lightgray;
`;

const CartBuy = styled.button`
  background-color: #dc3e45;
  color: #ffffff;
  width: 100%;
  /* border-radius: 100px; */
  /* border-radius: 100px; */
  outline: none;
  border: none;
  height: 40px;
  margin: 12px auto;
  padding: 9px;
`;

export default CartPayment;