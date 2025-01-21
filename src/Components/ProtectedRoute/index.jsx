



import Cookies from 'js-cookie'
import { useEffect } from 'react'
import {   useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'; 






function ProtectedRoute({children}) {
    const navigate= useNavigate()
    useEffect(()=>{
        const token = Cookies.get("accessToken")
        if (token === undefined ){
             navigate("/login")
        }

        
       
    },[navigate])
        

    return  <>{children}</>;

        

}

ProtectedRoute.PropTypesropTypes = {
    children: PropTypes.node.isRequired, 
};



export default ProtectedRoute
