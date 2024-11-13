import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Login from '../components/users/auth/Login.jsx';
import Register from '../components/users/auth/Register.jsx';
import Home from '../components/users/home/Home.jsx';
import Product from '../components/users/products/Product.jsx';
import NotFound from '../components/users/not-found/NotFound.jsx';
import Dashboard from '../components/admin/dashboard/DashBoard.jsx';
import AddCategory from '../components/admin/addcategory/AddCategory.jsx';
import AddProducer from '../components/admin/addproducer/AddProducer.jsx';
import AddProduct from '../components/admin/addproduct/AddProduct.jsx';
// import PrivateRoute from '../components/PrivateRoute.js';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element:
          <Home />
      },
      {
        path: "products",
        element:
          <Product />
      },

    ]
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "register",
    element: <Register />
  },
  {
    path: "*",
    element:
      <NotFound />
  },

  {
    path: "/admin",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element:
          <Dashboard />
      },
      {
        path: "addcategory",
        element:
          <AddCategory />
      },
      {
        path: "addproducer",
        element:
          <AddProducer />
      },
      {
        path: "addproduct",
        element:
          <AddProduct />
      },

    ]
  },
]);