import React, { useEffect ,useState } from 'react'
import { useNavigate } from "react-router-dom";
import { GetLoggedInUserDetails } from '../apicalls/users';
import { message } from 'antd';

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [ user,setUser] = useState(null);
  
    const validateUserToken = async () => {
      try {
        const response = await GetLoggedInUserDetails();
        
        if (response.success) {
          //dispatch(SetUser(response.data));
        } else {
          //localStorage.removeItem("token");
          //navigate("/login");
          message.error(response.message);
        }
      } catch (error) {
        //localStorage.removeItem("token");
        //navigate("/login");
       // dispatch(HideLoading());
        message.error(error.message);
      }
    };

useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
    } else {
        validateUserToken();
    }
}, []);
return
<div>{user && children}</div>; 
}

export default ProtectedRoute;