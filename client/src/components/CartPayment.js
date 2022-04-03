import styled from "styled-components";

const CartPayment = ({total2Pay}) => {
  return (
    <Wrapper>
      <Title>Summary</Title>
      <Subtotal>
        <p>Subtotal</p>
        <p>{total2Pay.subtotal}</p>
      </Subtotal>
      <Subtotal>
        <p>Shipping</p>
        <p>{total2Pay.shipping}</p>
      </Subtotal>
      <Subtotal>
        <p>Taxes</p>
        <p>{total2Pay.taxes}</p>
      </Subtotal>

      <Total>
        <Strong>Total</Strong>
        <Strong>${total2Pay.total}</Strong>
      </Total>
      <CartBuy>Buy</CartBuy>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 12px 16px;
  display: flex;
  flex-direction: column;
  width: 200px;
`;
const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;
const Subtotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
`;
const Total = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid lightgray;
  padding: 12px 0;
  border-bottom: 1px solid lightgray;
`;
const Strong = styled.p`
  font-weight: bold;
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