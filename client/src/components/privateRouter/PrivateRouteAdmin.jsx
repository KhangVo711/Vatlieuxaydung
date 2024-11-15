import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookie from 'js-cookie';


const PrivateRouteAdmin = ({ children }) => {
    const token = Cookie.get('admin');
    
    if (!token) {
        return <Navigate to="/admin/login" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; 
        if (decodedToken.exp < currentTime) {
         
            Cookie.remove('admin'); 
            return <Navigate to="/admin/login" />;
        }
    } catch (error) {
        
        Cookie.remove('admin'); 
        return <Navigate to="/admin/login" />;
    }

    return children;
};
export default PrivateRouteAdmin;

