import React, { useEffect  } from 'react'
import { useNavigate } from "react-router-dom";
import { GetLoggedInUserDetails ,GetUserDetails } from '../apicalls/users';
import { message } from 'antd';
import { useDispatch ,useSelector } from 'react-redux';
import { SetUser } from '../redux/usersSlice';

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const {user} =useSelector(state=>state.users)
    const dispatch =useDispatch();

    const validateUserToken = async () => {
      try {
        const response = await GetLoggedInUserDetails();
        
        if (response.success) {
          SetUser(response.data);
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
return <div>
  {user && (
  <>
    {user.name}
    {user.email}
    {user.role}
    {children}
    </>
)}
</div>
};

export default ProtectedRoute;