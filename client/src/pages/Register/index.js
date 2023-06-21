import React from 'react';
import { Form } from "antd";

function Register() {
  return (
    <div className="h-screen  bg-primary">
      <div className="authentication-form bg-white p-2">
        <Form layout="vertical">
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
        </Form>
      </div>
    </div>
  );
}

export default Register 