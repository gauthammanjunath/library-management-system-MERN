import React from 'react'
import { Modal } from 'antd';


function Issues({open =false ,setOpen,selectedBook }) {
  return (
    <Modal title="Issue Book " open={open} onCancel={()=>setOpen(false)}>
    <div>Issues</div>
    </Modal>
  );
}

export default Issues;