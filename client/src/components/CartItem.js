import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import Loading from "./Loading";
import { ItemsContext } from "../contexts/ItemsContext";

export default function CartItem({ id, qty = 1 }) {
  const [quantity, setQuantity] = useState(qty);
  const [item, setItem] = useState({ _id: null });
  const {
    state: { items },
  } = useContext(ItemsContext);
  console.log(items);

  useEffect(() => {
    // create item
    const initItem = items.find((el) => el._id === id);
    // initItem.qty = 1;
    console.log(initItem);
    setItem(initItem);
    // setQuantity(initItem.qty);
  }, [id]);
  if (!item._id) {
    return <Loading />;
  }
  console.log(item._id);

  //   const handleRemove = () => {
  //     fetch(`/api/cart`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         cartArray: { qty: setQuantity(0) },
  //         email: state.user.email,
  //       }),
  //     })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         console.log("data", data);
  //         console.log(i._id);
  //       })
  //       .catch((error) => {
  //         console.log("error", error);
  //       });
  //   };\
  // const itemPrice = item.price.replace("$", "");
  // const ItemTotal = parseFloat(quantity) * parseFloat(itemPrice);
  const ItemTotal = 0;
  // console.log(item.qty);
  console.log("item", item);
  return (
    <CartContainer>
      <CartDiv>
        <CartImg src={item.imageSrc} alt={item.name} />
        <CartInfo>
          <h1>{item.name}</h1>
          <h1>Category : {item.category}</h1>
          <p>Body Location {item.body_location}</p>
          <p>${ItemTotal.toFixed(2)}</p>
          <QttyDiv>
            Quantity : {quantity}
            <div>
              <AiOutlineArrowDown
                onClick={() => setQuantity((quantity) => --quantity)}
              />
              <AiOutlineArrowUp
                onClick={() => setQuantity((quantity) => ++quantity)}
              />
            </div>
          </QttyDiv>
          <CartButtons>
            <CartBtn>Move To Wishlist</CartBtn>
            <CartBtn>Remove</CartBtn>
          </CartButtons>
        </CartInfo>
      </CartDiv>
      <hr />
      <CartPayment>
        <h1>Summary</h1>
        <h1>Do You have a Promo Code?</h1>
        <CartTotal>
          <p>Subtotal</p>
          <p>${ItemTotal}</p>
        </CartTotal>
        <CartTotal>
          <p>Estimated Shhipping</p>
          <p>$8.00</p>
        </CartTotal>
        <CartTotal>
          <p>Estimated Tax</p>
          <strong>--</strong>
        </CartTotal>

        <CartFinal>
          <p>Subtotal</p>
          <p>${ItemTotal}</p>
        </CartFinal>
        <CartBuy>Buy</CartBuy>
      </CartPayment>
    </CartContainer>
  );
}

const CartContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  max-width: 80%;
`;

const CartImg = styled.img`
  box-shadow: 0 5px 15px 2px rgb(0 0 0 / 3%);
`;
const CartInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const CartButtons = styled.div`
  display: flex;
  gap: 20px;
`;
const CartBtn = styled.button`
  background: transparent;
  border: none;
  padding: 0 0 5px;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
`;

const QttyDiv = styled.div`
  display: flex;
  gap: 20px;
`;
const CartDiv = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px 0;
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
const CartPayment = styled.div`
  display: flex;
  justify-content: space-around;
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
