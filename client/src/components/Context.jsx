import React, { useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
  const [isData, setIsData] = useState({});
  const token = Cookies.get('jwt');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsData(decodedToken);
    }
    else {
      setIsData({});
    }
    
  }, [token]);

  

  return (
    <Context.Provider value= {{isData, setIsData}}>
      {children}
    </Context.Provider>
  )
}