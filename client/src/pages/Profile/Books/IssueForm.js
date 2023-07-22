import React, { useState } from 'react'
import { Modal,Form } from 'antd';
import moment from 'moment';
import Button from '../../../components/Button';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loadersSlice';
import { GetUserById } from "../../../apicalls/users";

function IssueForm({
  open = false,
  setOpen, 
  selectedBook,
  setSelectedBook,
  type,
})     {
  const[validated ,setValidated]=React.useState("");
  const[errorMessage ,setErrorMessage]=React.useState("");
  const[patronData ,setPatronData]=useState(null);
  const[patronId,setPatronId]=React.useState("");
  const[returnDate,setReturnDate]=React.useState("");
  const dispatch=useDispatch();

  const validate= async() =>{
  try {
    dispatch(ShowLoading());
    const response =await GetUserById(patronId);
    if(response.success){
      if (response.data.role !== "patron") {
        setValidated(false);
        setErrorMessage("This user is not a patron");
        dispatch(HideLoading());
        return;
      } else {
       setPatronData(response.data);
        setValidated(true);
        setErrorMessage("");
      }
    }else{
      setValidated(false);
      setErrorMessage(response.message);
    }
    dispatch(HideLoading());
  } catch (error) {
    dispatch(HideLoading());
    setValidated(false);
    setErrorMessage(error.message);
  }
    };

  return (
  <Modal  title="Issue Form " open={open} onCancel={()=>setOpen(false)}
  footer= {null}>
     <div className="flex flex-col gap-2">
        <h1 className="text-secondary font-bold text-xl uppercase text-center">
        Issue New Book
        </h1> 
          <span>Patron Id </span>
          <input
            type="text"
            value={patronId}
            onChange={(e) => setPatronId(e.target.value)}
            placeholder="Patron Id"
            disabled={type === "edit"}
          />
            <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            placeholder="Return Date"
            min={moment().format("YYYY-MM-DD")}
          />
          
          { errorMessage && <span className="error-message">{errorMessage}</span>}
          {validated && <div className='bg-secondary p-1 text-white'>
            <h1 className='text-sm' >
              Patron ={patronData.name}
              </h1>
              <h1>
              Number Of Days : {moment(returnDate).diff(moment(), "days")}
            </h1>
              <h1>Rent per Day : {selectedBook.rentPerDay}</h1>
              <h1>
              Rent :{" "}
              {moment(returnDate).diff(moment(), "days") *
                selectedBook?.rentPerDay}
            </h1>

              </div>
              }
        <div className="flex justify-end gap-2 w-100">
          <Button
            title="Cancel"
            variant="outlined"
            onClick={() => setOpen(false)}
          />
             <Button
            title="Validate"
            disabled={patronId === "" || returnDate === ""}
            onClick={validate}
          />

          {validated &&<Button title="Issue"
          disabled={patronId === "" || returnDate === ""}
       />}

          </div>
        </div>
  </Modal>
  );
}

export default IssueForm;