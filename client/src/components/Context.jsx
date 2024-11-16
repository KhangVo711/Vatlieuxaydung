import React, { useState, useEffect, createContext } from "react";
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [isData, setIsData] = useState({});
  const token = Cookies.get('jwt');
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsData(decodedToken);
    } else {
      setIsData({});
    }
  }, [token]);

  const [isDataAdmin, setIsDataAdmin] = useState({});
  const tokenAdmin = Cookies.get('admin');
  useEffect(() => {
    if (tokenAdmin) {
      const decodedToken = jwtDecode(tokenAdmin);
      setIsDataAdmin(decodedToken);
    } else {
      setIsDataAdmin({});
    }
  }, [tokenAdmin]);

  const [loadCategory, setLoadCategory] = useState(true);
  const [loadProducer, setLoadProducer] = useState(true);
  const [loadProduct, setLoadProduct] = useState(true);
  const [loadDataInvoice, setLoadDataInvoice] = useState(true);
  return (
    <Context.Provider
      value={{
        isData,
        setIsData,
        isDataAdmin,
        setIsDataAdmin,
        loadCategory,
        setLoadCategory,
        loadProducer,
        setLoadProducer,
        loadProduct,
        setLoadProduct,
        loadDataInvoice, 
        setLoadDataInvoice
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
