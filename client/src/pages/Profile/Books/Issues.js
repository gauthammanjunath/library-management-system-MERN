import React, { useEffect } from 'react'
import {  Modal ,Table,message } from 'antd';
import IssueForm from './IssueForm';
import { HideLoading, ShowLoading } from '../../../redux/loadersSlice';
import { useDispatch } from 'react-redux';
import {  GetIssues} from "../../../apicalls/issues";
import moment from 'moment';
import Button from '../../../components/Button';


function Issues({open =false ,setOpen,selectedBook }) {
  const[issues,setIssues]=React.useState([]);
  const [selectedIssue, setSelectedIssue] = React.useState(null);
  const [showIssueForm, setShowIssueForm] = React.useState(false);
  const dispatch=useDispatch();
  const getIssues = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetIssues( 
        { book:selectedBook._id });
      dispatch(HideLoading());
      if (response.success) {
        setIssues(response.data);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    getIssues();
  }, []);
  const onReturnHandler=async(issue) =>{}
const columns =[
  {
    title : "id",
    dataIndex: "_id",
  },
  {
    title :"Patron/User",
    dataIndex:"user",
    render:(user) =>user.name,
  },
  {
    title: "Issued On",
    dataIndex: "issueDate",
    render: (issueDate) => moment(issueDate).format("DD-MM-YYYY hh:mm A"),
  },
  {
    title: "Return Date (Due Date)",
    dataIndex: "returnDate",
    render: (dueDate) => moment(dueDate).format("DD-MM-YYYY hh:mm A"),
  },
  {
    title:"Rent",
    dataIndex:"rent",
  },
  {
    title:"Fine",
    dataIndex:"fine",
  },
  {
    title: "Returned On",
    dataIndex: "returnedDate",
  },
  {
    title:"Action",
    dataIndex:"action",
  render : (action, record) => {
    return (
      !record.returnedDate && (
        <div className="flex gap-1">
          <Button
            title="Renew"
            onClick={() => {
              setSelectedIssue(record);
              setShowIssueForm(true);
            }}
            variant="outlined"
          />
          <Button
            title="Return Now"
            onClick={() => onReturnHandler(record)}
            variant="outlined" 
          />
          {/* <Button
            title="Delete"
            variant="outlined"
            onClick={() => deleteIssueHandler(record)}
          /> */}
        </div>
      )
    );
  },
}
];
  

  return (
    <Modal title="Issues " open={open} onCancel={()=>setOpen(false)}
      footer= {null} width={1200} >
   <Table
   columns={columns}
   dataSource={issues}
   />
    </Modal>
  );
}

export default Issues;