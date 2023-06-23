import React from 'react';
import { Form } from "antd";
import Button from '../../components/Button';


function Register() {

  const onFinish = (values) => {
    console.log("success:", values);
  };
  return (
    <div className="h-screen  bg-primary flex items-center justify-center">
      <div className="authentication-form bg-white p-2">
       <h1 className="text-Primary text-2xl">SRH Library-Register</h1>

        <Form layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
          >
            < input type="text" placeholder="Name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="Email"
          >
            < input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="Confirm Password"
          >
            < input type="password" placeholder="Password" />
          </Form.Item>
          <Button title='Register' type="Submit" />
        </Form>
      </div>
    </div>
  );
}

export default Register;
