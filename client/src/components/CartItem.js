import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import Loading from "./Loading";
import { ItemsContext } from "../contexts/ItemsContext";
import { UserContext } from "../contexts/UserContext";

const CartItem = ({ id, qty = 1, handleTotal2Pay }) => {
  const [quantity, setQuantity] = useState(qty);
  const [item, setItem] = useState({ _id: null });
  const [itemTotal, setItemTotal] = useState(0);

  const {
    state: { 
      items 
    },
  } = useContext(ItemsContext);
  // console.log(items);

  const {
    state: {
      user,
    },
    actions: {
      updateUser,
    }
  } = useContext(UserContext);

  useEffect(() => {
    // create item
    const initItem = items.find((el) => el._id === id);
    // initItem.qty = 1;
    // console.log(initItem);
    setItem(initItem);
    setItemTotal(initItem.price.replace("$", ""));
  }, [id]);
  if (!item._id) {
    return <Loading />;
  }
  // console.log(item._id);

  const handleCart = () => {
    // update the cartArray state

    const findProduct = user.cartArray.findIndex(
      (el) => el._id === item._id
    );
    // console.log(findProduct);
    const copy = user.cartArray;
    if (findProduct === -1) {
      copy.push(item);
    } else {
      copy.splice(findProduct, 1);
    }
    console.log(copy);
    updateUser({ user: { ...user, cartArray: copy } });
    fetch(`/api/cart`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartArray: copy,
        email: user.email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleClick = (action) => {
    const value = action === 'plus' ? quantity + 1 : quantity -1;
    setQuantity(value);
    const itemPrice = item.price.replace("$", "");
    // console.log(value);
    // console.log(itemPrice);
    const copyItemTotal = parseFloat(value * itemPrice).toFixed(2);
    // console.log(copyItemTotal);
    setItemTotal(copyItemTotal);
    handleTotal2Pay({
      _id: item._id,
      total: copyItemTotal,
    });
  }

  return (
    <CartContainer>
      <CartDiv>
        <CartImg src={item.imageSrc} alt={item.name} />
        <CartInfo>
          <h1>{item.name}</h1>
          <h1>Category : {item.category}</h1>
          <p>Body Location {item.body_location}</p>
          <p>${itemTotal}</p>
          <QttyDiv>
            Quantity : {quantity}
            <div>
              <AiOutlineArrowDown
                onClick={() => handleClick('minus')}
              />
              <AiOutlineArrowUp
                onClick={() => handleClick('plus')}
              />
            </div>
          </QttyDiv>
          <CartButtons>
            <CartBtn>Add to wish list</CartBtn>
            <CartBtn onClick={handleCart}>Delete</CartBtn>
          </CartButtons>
        </CartInfo>
      </CartDiv>
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
  /* border-bottom: 1px solid lightgray; */
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

export default CartItem;