import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { GetLoggedInUserDetails } from '../apicalls/users';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/usersSlice';
import { HideLoading, ShowLoading } from '../redux/loadersSlice';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.users)
  const dispatch = useDispatch();

  const validateUserToken = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetLoggedInUserDetails();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        //localStorage.removeItem("token");
       // navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
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
      <div className="p-1">
        <div className='header p-2 bg-primary flex justify-cennter'>
          <h1 className='text-2xl text-white font-bold'> SRH LIBRARY</h1>
           
           <div 
           className='flex items-center'
           >
            
            </div>
        </div>
        <div className='content'>{children}</div>
      </div>
    )}
    </div>
};

export default ProtectedRoute;