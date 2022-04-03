import { createContext, useReducer } from "react";

export const WishListContext = createContext(null);

const initialState = {
  isWishListBarOpen: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "open": {
      return {
        ...state,
        isWishListBarOpen: true,
      };
    }
    case "close": {
      return {
        ...state,
        isWishListBarOpen: false,
      };
    }
    default: {
      throw new Error(`Unrecognized action: ${action.type}`);
    }
  }
};

export const WishListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const closeWishListBar = () => {
    dispatch({
      type: "close",
    });
  };

  const openWishListBar = () => {
    dispatch({
      type: "open",
    });
  };

  return (
    <WishListContext.Provider
      value={{
        state,
        actions: {
          openWishListBar,
          closeWishListBar,
        },
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};
