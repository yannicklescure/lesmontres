// import { useContext, useEffect, useState } from "react";
import { useContext } from "react";
import { ItemsContext } from "../contexts/ItemsContext";
import { UserContext } from "../contexts/UserContext";
// import { WishListContext } from "../contexts/WishListContext";

const WishList = () => {
  const {
    state: {
      user: { wishList, email },
    },
    actions: { updateUser },
  } = useContext(UserContext);
  // const userContextObject = useContext(UserContext);
  const {
    state: { items },
  } = useContext(ItemsContext);

  function removeItemFromWishList(email, _id) {
    fetch("/api/wishlist/remove", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        itemId: String(_id),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => updateUser(response.data));
  }

  function addToCart(email, item) {
    fetch("/api/cart", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        cartArray: item,
      }),
    }).then(() => {
      removeItemFromWishList(email, item._id);
    });
  }

  const wishListObjectArray = wishList.map((wishListItem) => {
    const filteredWishListObjectArray = items.filter((item) => {
      return item._id === Number(wishListItem._id);
    });
    console.log(filteredWishListObjectArray);
    if (filteredWishListObjectArray.length > 0) {
      return filteredWishListObjectArray[0];
    }
    return null;
  });
  console.log(wishListObjectArray);

  const wishListItems = wishListObjectArray.map((wishListItem) => {
    const imgSrc = wishListItem.imageSrc;
    const name = wishListItem.name;

    return (
      <div className="cart-item">
        <div
          className="item-info"
          onClick={() => {
            removeItemFromWishList(email, wishListItem._id);
          }}
        >
          <img src={imgSrc} alt={name} />
          <h4>{wishListItem.name}</h4>
        </div>
        <div className="inventory-container">
          <div className="unit-price">{wishListItem.price}</div>
        </div>
        <button
          className=""
          onClick={() => {
            addToCart(email, wishListItem);
          }}
        >
          Add To Cart
        </button>
      </div>
    );
  });
  return <div className="wish-list-main-container">{wishListItems}</div>;
};

export default WishList;
