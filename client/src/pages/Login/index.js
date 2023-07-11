import React ,{useEffect} from 'react';
import { Form ,message } from "antd";
import Button from '../../components/Button';
import { Link ,useNavigate } from 'react-router-dom';
import{ LoginUser } from "../../apicalls/users";
import { useDispatch } from 'react-redux';
import { ShowLoading,HideLoading } from '../../redux/loadersSlice';

function Login() {
  const navigate =useNavigate();
  const dispatch =useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await LoginUser(values);
      dispatch(HideLoading());
      if(response.success) {
        message.success(response.message);
        localStorage.setItem("token" ,response.data) ;
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message); 
      
    }
  };
  useEffect(()=>{
  const token=localStorage.getItem("token");
  if(token) {
    navigate("/");
  }
  },[]);
  return (
    <div className="h-screen  bg-primary flex items-center justify-center">
      <div className="authentication-form bg-white p-3">
        <h1 className="text-primary text-2xl font-bold mb-1"><Link to="https://www.srh-hochschule-heidelberg.de/landingpage/dein-studium-im-bereich-nachhaltigkeitsmanagement-in-heidelberg/?gclid=Cj0KCQjwqNqkBhDlARIsAFaxvwyvQBmaYZpnKVAiPZSNKTnx0hjK6ukXlpMw2zUbbl6czPDY14mcTVIaAgpcEALw_wcB">SRH Hochschule Library </Link></h1>
        <hr />
        <Form layout="vertical"
          onFinish={onFinish} className="mt-1">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required:true,
                message :"Please input your email",
              }
            ]}
          >
            < input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required:true,
                message :"Please input your Password",
              }
            ]}
          >
            < input type="password" placeholder="Password" />
          </Form.Item>

          <div className="text-center  mt-2 flex flex-col gap-1">
            <Button title='Login' type="Submit" />
            <Link to="/Register"
              className='text-primary text-sm underline'
            >Don't have an account?Click here to Register</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;