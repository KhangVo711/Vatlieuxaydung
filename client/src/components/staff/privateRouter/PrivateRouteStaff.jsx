import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookie from 'js-cookie';


const PrivateRouteStaff = ({ children }) => {
    const token = Cookie.get('staff');
    
    if (!token) {
        return <Navigate to="/staff/login" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; 
        if (decodedToken.exp < currentTime) {
         
            Cookie.remove('staff'); 
            return <Navigate to="/staff/login" />;
        }
    } catch (error) {
        
        Cookie.remove('staff'); 
        return <Navigate to="/staff/login" />;
    }

    return children;
};
export default PrivateRouteStaff;

