import { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../contexts/ItemsContext";
import { UserContext } from "../contexts/UserContext";
import { WishListContext } from "../contexts/WishListContext";

const WishList = () => {
  const {
    state: {
      user: { wishList },
    },
  } = useContext(UserContext);

  const {
    state: { items },
  } = useContext(ItemsContext);

  const wishListObjectArray = wishList.map((wishListItemId) => {
    const filteredWishListObjectArray = items.filter((item) => {
      return item._id == wishListItemId;
    });
    if (filteredWishListObjectArray.length > 0) {
      return filteredWishListObjectArray[0];
    }
    console.log(wishListObjectArray, filteredWishListObjectArray);
  });

  return <h1>This is the last thing I will do</h1>;
  //(
  //   <div className="wish-list-main-container">
  //     <div className="cart-item">
  //       <div
  //         className="item-info"
  //         onClick={() => {removeItemFromCart(wishListObjectArray.id)}
  //       >
  //         <img
  //           src="${wishListObjectArray.imageSrc}"
  //           alt="${wishListObjectArray.name}"
  //         />
  //         <h4>${wishListObjectArray.name}</h4>
  //       </div>
  //       <div className="unit-price">
  //         <small>$</small>${wishListObjectArray.price}
  //       </div>
  //       <div className="units">
  //         <div
  //           className="btn minus"
  //           onClick="changeNumberOfUnits('minus', ${item.id})"
  //         >
  //           -
  //         </div>
  //         <div className="number">${wishListObjectArray.numInStock}</div>
  //         <div
  //           className="btn plus"
  //           onClick="changeNumberOfUnits('plus', ${wishListObjectArray.id})"
  //         >
  //           +
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};
export default WishList;
