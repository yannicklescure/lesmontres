import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const WishList = () => {
  const [wishlist, setWishlist] = useState("");
  const {
    state,
    actions: { loadingUser, receivedUserFromServer, errorFromServerUser },
  } = useContext(UserContext);

  useEffect(() => {
    fetch(`/api/cart`)
      .then((res) => res.json())
      .then((response) => receivedUserFromServer({ setCart: response.data }));
  }, [cart]);
  console.log(state.user.wishList);

  return <h1>Hello from deep on your cart</h1>;
};
export default WishList;
