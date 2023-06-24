import React from 'react';
import { Form } from "antd";
import Button from '../../components/Button';
import { Link } from 'react-router-dom';


function Register() {

  const onFinish = (values) => {
    console.log("success:", values);
  };
  return (
    <div className="h-screen  bg-primary flex items-center justify-center">
      <div className="authentication-form bg-white p-3">
        <h1 className="text-primary text-2xl font-bold mb-1"><Link to="https://www.srh-hochschule-heidelberg.de/landingpage/dein-studium-im-bereich-nachhaltigkeitsmanagement-in-heidelberg/?gclid=Cj0KCQjwqNqkBhDlARIsAFaxvwyvQBmaYZpnKVAiPZSNKTnx0hjK6ukXlpMw2zUbbl6czPDY14mcTVIaAgpcEALw_wcB">SRH Hochschule Library </Link></h1>
        <hr />
        <Form layout="vertical"
          onFinish={onFinish} className="mt-1"
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

          <div className="text-center  mt-2 flex flex-col gap-1">
            <Button title='Register' type="Submit" />
            <Link to="/Login"
              className='text-primary text-sm underline'
            >Already have an account?Click here to login</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
