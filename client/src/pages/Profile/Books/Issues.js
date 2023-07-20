import React from 'react'
import { Modal } from 'antd';
import IssueForm from './IssueForm';

function Issues({open =false ,setOpen,selectedBook }) {
  return (
    <Modal title="Issue Book " open={open} onCancel={()=>setOpen(false)}>
    <div>Issues</div>
    </Modal>
  );
}

export default Issues;