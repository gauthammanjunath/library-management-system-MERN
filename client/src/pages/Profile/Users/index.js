import Button from "../../../components/Button";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import {  Table, message } from "antd";
import { GetAllUsers } from "../../../apicalls/users";
import moment from "moment";

function Users({ role }) {
  const [users, setUsers] = React.useState([]);
  const dispatch= useDispatch();
  const getUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllUsers(role);
      console.log(response)
      dispatch(HideLoading());
      if (response.success) {

        setUsers(response.data);
        
      } else {
        
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
useEffect(() =>{
  getUsers();
},[role]);

const columns =[
  {
    title :"Name",
    dataIndex:"name",
  },
  {
    title :"Email",
    dataIndex:"email",
  },
  {
    title :"Phone",
    dataIndex:"phone",
  },
  {
    title :"Created At",
    dataIndex:"createdAt",
    render: (createdAt) => moment(createdAt).format("DD-MM-YYYY"),
  },
  {  title : "Actions",
     dataIndex:"actions",
     render:(actions,record) =>(
    <div>
      <Button
      title="Books"
      variant="outlined" />
    </div>
  ),
},
];
return <div>
  <Table dataSource={users} columns={columns}/>
</div>

}

export default Users ;