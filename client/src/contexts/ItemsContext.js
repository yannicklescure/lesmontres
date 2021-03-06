import { createContext, useEffect, useReducer } from "react";
import usePersistedState from "../hooks/usePersistedState";

export const ItemsContext = createContext(null);

const initialState = {
  status: "idle",
  hasLoaded: false,
  items: [],
  searchItems: [],
  message: null,
  type: "initial",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "initial": {
      return {
        ...state,
      };
    }
    case "loading-items-from-server": {
      return {
        ...state,
        status: "loading-items-feed",
      };
    }
    case "received-items-from-server": {
      return {
        ...state,
        ...action,
        hasLoaded: true,
        status: "items-loaded",
      };
    }
    case "received-search-items-from-server": {
      return {
        ...state,
        ...action,
        hasLoaded: true,
        status: "items-loaded",
      };
    }
    case "received-items-from-storage": {
      return {
        ...state,
        ...action,
        hasLoaded: true,
        status: "items-loaded",
      };
    }
    case "error-from-server": {
      return {
        ...state,
        status: "error-from-server",
      };
    }
    default: {
      throw new Error(`Unrecognized action: ${action.type}`);
    }
  }
};

export const ItemsProvider = ({ children }) => {
  const [localStorage, setLocalStorage] = usePersistedState('items', []);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // console.log(localStorage);
    if(localStorage?.length > 0) {
      dispatch({
        hasLoaded: true,
        items: localStorage,
        message: 'data loaded from storage',
        type: "received-items-from-storage",
      })
    }
  // eslint-disable-next-line
  }, []);

  const loadingItems = () => {
    dispatch({
      type: "loading-items-from-server",
    });
  };

  const receivedItemsFromServer = (data) => {
    setLocalStorage(data.items);
    dispatch({
      ...data,
      type: "received-items-from-server",
    });
  };

  const receivedSearchItemsFromServer = (data) => {
    dispatch({
      ...data,
      type: "received-search-items-from-server",
    });
  };

  const errorFromServer = () => {
    dispatch({
      type: "error-from-server",
    });
  };

  return (
    <ItemsContext.Provider
      value={{
        state,
        actions: {
          loadingItems,
          receivedItemsFromServer,
          receivedSearchItemsFromServer,
          errorFromServer,
        },
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
