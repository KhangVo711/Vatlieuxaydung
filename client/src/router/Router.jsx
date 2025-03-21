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
import LoginAdmin from '../components/admin/auth/LoginAdmin.jsx';
import PrivateRouterAdmin from '../components/privateRouter/PrivateRouteAdmin.jsx';
import ImportGoods from '../components/admin/importGoods/ImportGoods.jsx';
import Cart from '../components/users/cart/Cart.jsx';
import OrderCart from '../components/admin/orderCart/orderCart.jsx';
import Order from '../components/users/order/Order.jsx';
import AddStaff from '../components/admin/addstaff/AddStaff.jsx';
import LoginStaff from '../components/staff/LoginStaff.jsx';
import PrivateRouterStaff from '../components/staff/privateRouter/PrivateRouteStaff.jsx';
import ScrollToTop from '../components/ScrollToTop.jsx';
import ViewUsers from '../components/admin/viewUser/ViewUser.jsx';
import AddDelivery from '../components/admin/adddelivery/AddDelivery.jsx';
import AddPromo from '../components/admin/addpromo/AddPromo.jsx';
import Repo from '../components/admin/repoProduct/Repo.jsx';
import Calendar from '../components/admin/calendar/tableCalender/Calendar.jsx';
import Contact from '../components/users/contact/Contact.jsx';
import About from '../components/users/about/About.jsx';
import AddBranch from '../components/admin/addbranch/AddBranch.jsx';
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <App />
      </>
    ),
    children: [
      {
        path: "",
        element:
          <Home />
      },
      {
        path: "products/*",
        element:
          <Product />
      },
      {
        path: "cart",
        element:
          <Cart />
      },
      {
        path: "ordered",
        element:
          <Order />
      },
      {
        path: "contact",
        element:
          <Contact />
      },
      {
        path: "about",
        element:
          <About />
      },
    ]
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "/admin/login",
    element: <LoginAdmin />
  },
  {
    path: "/staff/login",
    element: <LoginStaff />
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
          <PrivateRouterAdmin>
            <Dashboard />
          </PrivateRouterAdmin>
      },
      {
        path: "addcategory",
        element:
          <PrivateRouterAdmin>
            <AddCategory />
          </PrivateRouterAdmin>

      },
      {
        path: "addproducer",
        element:
          <PrivateRouterAdmin>
            <AddProducer />
          </PrivateRouterAdmin>

      },
      {
        path: "addproduct",
        element:
          <PrivateRouterAdmin>
            <AddProduct />
          </PrivateRouterAdmin>

      },
      {
        path: "importgoods",
        element:
          <PrivateRouterAdmin>
            <ImportGoods />
          </PrivateRouterAdmin>
      },
      {
        path: "ordercart",
        element:
          <PrivateRouterAdmin>
            <OrderCart />
          </PrivateRouterAdmin>

      },
      {
        path: "addstaff",
        element:
          <PrivateRouterAdmin>
            <AddStaff />
          </PrivateRouterAdmin>

      },
      {
        path: "viewUsers",
        element:
          <ViewUsers />
      },
      {
        path: "delivery",
        element:
          <PrivateRouterAdmin>
            <AddDelivery />
          </PrivateRouterAdmin>
      },
      {
        path: "promo",
        element:
          <PrivateRouterAdmin>
            <AddPromo />
          </PrivateRouterAdmin>
      },
      {
        path: "warehouse",
        element:
          <PrivateRouterAdmin>
            <Repo />
          </PrivateRouterAdmin>
      },
      {
        path: "calendar",
        element:
          <PrivateRouterAdmin>
            <Calendar />
          </PrivateRouterAdmin>
      },
      {
        path: "branch",
        element:
          <PrivateRouterAdmin>
            <AddBranch />
          </PrivateRouterAdmin>
      },
    ]
  },
  {
    path: "/staff",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element:
          <PrivateRouterStaff>
            <Dashboard />
          </PrivateRouterStaff>
      },
      {
        path: "addcategory",
        element:
          <PrivateRouterStaff>
            <AddCategory />
          </PrivateRouterStaff>

      },
      {
        path: "addproducer",
        element:
          <PrivateRouterStaff>
            <AddProducer />
          </PrivateRouterStaff>

      },
      {
        path: "addproduct",
        element:
          <PrivateRouterStaff>
            <AddProduct />
          </PrivateRouterStaff>

      },
      {
        path: "importgoods",
        element:
          <PrivateRouterStaff>
            <ImportGoods />
          </PrivateRouterStaff>
      },
      {
        path: "ordercart",
        element:
          <PrivateRouterStaff>
            <OrderCart />
          </PrivateRouterStaff>

      },
      {
        path: "viewUsers",
        element:
          <ViewUsers />
      },
      {
        path: "delivery",
        element:
          <PrivateRouterStaff>

            <AddDelivery />
          </PrivateRouterStaff>

      },
      {
        path: "warehouse",
        element:
          <PrivateRouterStaff>
            <Repo />
          </PrivateRouterStaff>
      },
    ]
  },
]);