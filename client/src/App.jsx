import { Outlet, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router'
import Header from './components/users/header/Header.jsx';
import Footer from './components/users/footer/Footer.jsx';
import HeaderAdmin from './components/admin/headerAdmin/HeaderAdmin.jsx';
import { useEffect, useState } from 'react';
import SideBarAdmin from './components/admin/sidebarAdmin/SideBarAdmin.jsx';
import { ContextProvider } from './components/Context.jsx';
function App() {

  const location = useLocation()
  const isLocation = /^\/admin\/.*/.test(location.pathname);
  const isLocationStaff = /^\/staff\/.*/.test(location.pathname);
  if (location.pathname === '/admin' || location.pathname === '/admin/') {
    return <Navigate to="/admin/dashboard" replace />
  }
  if (location.pathname === '/staff' || location.pathname === '/staff/') {
    return <Navigate to="/staff/dashboard" replace />
  }
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);

  useEffect(() => {
    setIsAdmin(isLocation);
  }, [isLocation])
  useEffect(() => {
    setIsStaff(isLocationStaff);
  }, [isLocationStaff])

  return !isAdmin && !isStaff ? (
    <>
      <ContextProvider>
        <Header />
        <Outlet />
        {(location.pathname !== '/cart' && location.pathname !== '/ordered') ? <Footer /> : null}
        
      </ContextProvider>
    </>
  ) : (
    <>
      <ContextProvider>

      <div className="flex w-full justify-between h-screen">
        <div className="w-1/5">
          <SideBarAdmin />
        </div>
        <div className="w-4/5 relative ">
          <HeaderAdmin />
          <Outlet />
        </div>
      </div>
      </ContextProvider>

    </>
  )
}

export default App
