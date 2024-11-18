import React, { useState, useEffect, createContext } from "react";
import { jwtDecode } from 'jwt-decode';
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
  const [loadStatus, setLoadStatus] = useState(true);



  const [cartItems, setCartItems] = useState([]);


  const onAddToCart = (product) => {
    setCartItems((prevCart) => {
      const existingProduct = prevCart.find((item) => item.masp === product.masp);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.masp === product.masp ? { ...item, soluong: item.soluong + 1 } : item
        );
      }
      return [...prevCart, { ...product, soluong: 1 }];
    });
  };
  const decreaseQuantity = (productId) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) =>
          item.masp === productId
            ? { ...item, soluong: item.soluong - 1 }
            : item
        )
        .filter((item) => item.soluong > 0)
    );
  };
  const increaseQuantity = (productId) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) =>
          item.masp === productId
            ? { ...item, soluong: item.soluong + 1}
            : item
        )
        .filter((item) => item.soluong > 0)
    );
  };

  const removeItem = (productId) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.masp !== productId));
  };


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
        setLoadDataInvoice,
        cartItems, setCartItems,
        onAddToCart,
        decreaseQuantity,
        increaseQuantity,
        removeItem,
        loadStatus, setLoadStatus
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
