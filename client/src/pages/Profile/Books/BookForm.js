import React from 'react';
import { Modal } from "antd";
import { Form, Col, Row, message } from "antd";
import Button from "../../../components/Button";
import { useDispatch, useSelector  ,useState} from 'react-redux';
import { AddBook ,UpdateBook } from "../../../apicalls/books";
import { HideLoading, ShowLoading } from '../../../redux/loadersSlice';


function BookForm({ open, setOpen, reloadBooks, setFormType, formType, selectedBook, setSelectedBook }) {
  const { user } = useSelector(state => state.users);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      values.createdBy = user._id;
      values.avialbleCopies = values.totalCopies;
      let response = null;
      if (formType === "add") {
        values.availableCopies = values.totalCopies;
        response = await AddBook(values);
      } else {
        values._id = selectedBook._id;
        response = await UpdateBook(values);
      }
      if (response.success) {
        message.success(response.message);
        reloadBooks();
        setOpen(false);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }
  return (
    <Modal
      title={formType ==="add" ? "Add Book" : "Update Book"}
      open={open}
      onCancel={() => setOpen(false)}
      centered
      width={800}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish} initialValues={{
          ...selectedBook, publishedOn: selectedBook?.publishedOn ? new Date(selectedBook?.publishedOn).toISOString().split('T')[0] : null
        }}>
      <Row
        gutter={[20, 20]}
      >
        <Col span={24}> 
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input book title" }]}
          >
            <input type="text" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input book Description" }]}
          >
            <textarea type="text" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Image URL "
            name="image"
            rules={[{ required: true, message: "Please input Image URL" }]}
          >
            <input type="text" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please input Category" }]}
          >
            <select>
              <option values="">
                Select Category
              </option>
              <option values="Mithology">
                Mithology
              </option>
              <option values="fiction">
                fiction
              </option>
              <option values="non-fiction">
                non-fiction
              </option>
              <option values="biography">
                biography
              </option>
              <option values="poetry">
                poetry
              </option>
              <option values="drama">
                drama
              </option>
              <option values="History">
                History
              </option>
            </select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Author"
            name="author"
            rules={[{ required: true, message: "Please input Author Name" }]}
          >
            <input type="text" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Publisher"
            name="publisher"
            rules={[{ required: true, message: "Please input Publisher" }]}
          >
            <input type="text" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="PublishedOn"
            name="publishedOn"
            rules={[{ required: true, message: "Please input Publish On" }]}
          >
            <input type="Date" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Rent Per Day"
            name="rentPerDay"
            rules={[{ required: true, message: "Please input rent per day" }]}
          >
            <input type="text" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Total Copies"
            name="totalCopies"
            rules={[{ required: true, message: "Please input Total copies " }]}
          >
            <input type="text" />
          </Form.Item>
        </Col>
      </Row>
      <div className='flex justify-end gap-2 mt-1 '>
        <Button type="button" variant="outlined" title="Cancel" onClick={() => setOpen(false)} />
        <Button title="Save" type='Submit' />
      </div>
    </Form>
    </Modal >
  );
}

export default BookForm;