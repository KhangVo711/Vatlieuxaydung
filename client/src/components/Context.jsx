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
  const [isDataStaff, setIsDataStaff] = useState({});
  const tokenStaff = Cookies.get('staff');
  useEffect(() => {
    if (tokenAdmin) {
      const decodedToken = jwtDecode(tokenAdmin);
      setIsDataAdmin(decodedToken);
    } else {
      setIsDataAdmin({});
    }
  }, [tokenAdmin]);

  useEffect(() => {
    if (tokenStaff) {
      const decodedToken = jwtDecode(tokenStaff);
      setIsDataStaff(decodedToken);
    } else {
      setIsDataStaff({});
    }
  }, [tokenStaff]);

  const [loadCategory, setLoadCategory] = useState(true);
  const [loadProducer, setLoadProducer] = useState(true);
  const [loadProduct, setLoadProduct] = useState(true);
  const [loadDataInvoice, setLoadDataInvoice] = useState(true);
  const [loadStatus, setLoadStatus] = useState(true);



  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const onAddToCart = (product) => {
  setCartItems((prevCart) => {
    const existingProduct = prevCart.find(
      (item) => item.masp === product.masp && item.mabienthe === product.mabienthe
    );
    if (existingProduct) {
      return prevCart.map((item) =>
        item.masp === product.masp && item.mabienthe === product.mabienthe
          ? { ...item, soluong: item.soluong + 1 }
          : item
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

  const [loadStaff, setLoadStaff] = useState(true);
  const [loadDelivery, setLoadDelivery] = useState(true);
  const [loadPromo, setLoadPromo] = useState(true);
  const [loadBranch, setLoadBranch] = useState(true);
  return (
    <Context.Provider
      value={{
        isData,
        setIsData,
        isDataAdmin,
        setIsDataAdmin,
        isDataStaff,
        setIsDataStaff,
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
        loadStatus, setLoadStatus,
        searchQuery, setSearchQuery,
        loadStaff, setLoadStaff,
        loadDelivery, setLoadDelivery,
        loadPromo, setLoadPromo,
        loadBranch, setLoadBranch
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
