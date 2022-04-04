import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import Loading from "./Loading";
import { ItemsContext } from "../contexts/ItemsContext";
import { UserContext } from "../contexts/UserContext";
import { NavLink, useHistory } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { COLORS } from "../constants";

const CartItem = ({ id, qty = 1, handleTotal2Pay }) => {
  const history = useHistory();

  const [quantity, setQuantity] = useState(qty);
  const [item, setItem] = useState({ _id: null });
  // eslint-disable-next-line
  const [itemTotal, setItemTotal] = useState(0);
  const [qtyBtnClicked, setQtyBtnClicked] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

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
    const wishListPosition = user.wishList.findIndex(item => item._id === initItem._id);
    setIsWishlisted(wishListPosition !== -1);
    // eslint-disable-next-line
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
    setQtyBtnClicked(true);
    setTimeout(() => {
      setQtyBtnClicked(false);
    }, 300);
    const value = action === 'plus' ? quantity + 1 : quantity === 1 ? 1 : quantity -1;
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

  const handleWishList = () => {
    // console.log(user.email);
    if (!user.email) {
      history.push('/login');
      return;
    }

    setIsWishlisted(!isWishlisted);
    setForceUpdate(forceUpdate + 1);

    const productId = item._id;
    // update the wishList state

    const findProduct = user.wishList.findIndex(
      (item) => item._id === productId
    );
    console.log(findProduct);
    const copy = user.wishList;
    if (findProduct === -1) {
      copy.push(item);
    } else {
      copy.splice(findProduct, 1);
    }
    console.log(copy);
    updateUser({ user: { ...user, wishList: copy } });
    fetch(`/api/wishList2`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wishList: copy,
        email: user.email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <CartContainer>
      <CartDiv>
        <CartImg src={item.imageSrc} alt={item.name} />
        <CartInfo>
          <ItemName to={`product/${item._id}`}>{item.name}</ItemName>
          <p>Category: {item.category}</p>
          <p>Body Location: {item.body_location}</p>
          {/* <p>${itemTotal}</p> */}
          <p>{item.price}</p>
          <QtyDiv>
            <div>Qty: {quantity}</div>
            <QtyBtn qtyBtnClicked={qtyBtnClicked} onClick={() => handleClick('minus')}>
              <AiOutlineArrowDown />
            </QtyBtn>
            <QtyBtn qtyBtnClicked={qtyBtnClicked} onClick={() => handleClick('plus')}>
              <AiOutlineArrowUp />
            </QtyBtn>
          </QtyDiv>
          <CartButtons>
            <AddToWishList
              onClick={handleWishList}
              forceUpdate={forceUpdate}
            >
              <WishlistIcons
                // onMouseEnter={() => setHeartHover(true)}
                // onMouseLeave={() => setHeartHover(false)}
                isWishlisted={isWishlisted}
              >
                {isWishlisted ? (
                  <AiFillHeart size="24" />
                ) : (
                  <AiOutlineHeart size="24" />
                )}
              </WishlistIcons>
              <div>Add to Wishlist</div>
            </AddToWishList>
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
  object-fit: contain;
`;

const CartInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const CartButtons = styled.div`
  display: flex;
  gap: 24px;
`;
const CartBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  /* border-bottom: 1px solid lightgray; */
  cursor: pointer;
`;
const QtyDiv = styled.div`
  display: flex;
  align-items: center;
`;
const QtyBtn = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: none;
  padding: 0;
  margin-left: 8px;
  cursor: pointer;
`;
const CartDiv = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid lightgray;
`;

const ItemName = styled(NavLink)`
  text-decoration: none;
  font-size: 18px;
  color: ${COLORS.secondary};

  &:hover {
    text-decoration: underline;
  }
`;

const AddToWishList = styled.button`
  border: none;
  background: none;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  cursor: pointer;
`;

const WishlistIcons = styled.div`
  color: ${({isWishlisted}) => isWishlisted ? COLORS.danger : COLORS.secondary};
`;

export default CartItem;