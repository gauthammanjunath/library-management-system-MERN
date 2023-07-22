import React from 'react'
import { Modal } from 'antd';
import IssueForm from './IssueForm';

function Issues({open =false ,setOpen,selectedBook }) {
  return (
    <Modal title="Issues " open={open} onCancel={()=>setOpen(false)}
      footer= {null} width={1000} >
    <div>Issue List</div>
    </Modal>
  );
}

export default Issues;