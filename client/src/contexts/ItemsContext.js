import { createContext, useReducer } from "react";

export const ItemsContext = createContext(null);

const initialState = {
  status: 'idle',
  hasLoaded: false,  
  items: [],
  message: null,
  type: "initial",
};

const reducer = (state, action) => {
  switch(action.type) {
    case "initial": {
      return {
        ...state,
      };
    }
    case "loading-items-from-server": {
      return {
        ...state,
        status: "loading-items-feed",
      }
    } 
    case "received-items-from-server": {
      return {
        ...state,
        ...action,
        hasLoaded: true,
        status: "items-loaded",
      }
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
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadingItems = () => {
    dispatch({
      type: "loading-items-from-server",
    });
  };

  const receivedItemsFromServer = (data) => {
    dispatch({
      ...data,
      type: "received-items-from-server",
    });
  };

  const errorFromServer = () => {
    dispatch({
      type: "error-from-server",
    });
  };

  return (
    <ItemsContext.Provider value={{ 
      state,
      actions: {
        loadingItems,
        receivedItemsFromServer,
        errorFromServer,
      }
    }}>
      {children}
    </ItemsContext.Provider>
  );
};