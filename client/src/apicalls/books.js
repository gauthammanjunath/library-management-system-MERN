import { axiosInstance } from "./axiosInstance" ;

//add Book
export const AddBook =async(payload) => {
    try {
        const response =await axiosInstance.post("api/books/add-book",payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}

//get all books 
export const GetAllBooks = async ()=> {
    try{
        const response = await axiosInstance.get('/api/books/get-all-books');
        return response.data;
    } catch (error) {
        throw error;
    } 
}
//update a book
export const UpdateBook = async (payload)=> {
    try{
        const response = await axiosInstance.put(
            `/api/books/update-book/${payload._id}`,
            payload
          );
        return response.data;
    } catch (error) {
        throw error;
    } 
}
//delete a book 
export const DeleteBook = async (id)=> {
    try{
        const response = await axiosInstance.delete(
            `/api/books/delete-book/${id}`,);
        return response.data;
    } catch (error) {
        throw error;
    } 
}
