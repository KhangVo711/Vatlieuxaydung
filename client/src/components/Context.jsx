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

  const [loadCategory, setLoadCategory] = useState(true);
  const [loadProducer, setLoadProducer] = useState(true);
  const [loadProduct, setLoadProduct] = useState(true);
  

  return (
    <Context.Provider value= {{isData, setIsData, loadCategory, setLoadCategory, loadProducer, setLoadProducer, loadProduct, setLoadProduct}}>
      {children}
    </Context.Provider>
  )
}