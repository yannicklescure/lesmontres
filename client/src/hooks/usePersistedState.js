import { useState, useEffect, useRef } from "react";

// https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
// sessionStorage.setItem('myCat', 'Tom');
// const cat = sessionStorage.getItem('myCat');
// sessionStorage.removeItem('myCat');

// const [numCookies, setNumCookies] = usePersistedState(1000, "num-cookies");

const usePersistedState = (name, defaultValue) => {
  const nameRef = useRef(name);
  const [value, setValue] = useState(() => {
    return sessionStorage.getItem(nameRef.current)
    ? JSON.parse(sessionStorage.getItem(nameRef.current))
    : defaultValue
  });

  useEffect(() => {
    sessionStorage.setItem(nameRef.current, JSON.stringify(value));
  }, [name, value]);
  // });
    
  return [value, setValue];
};

export default usePersistedState;