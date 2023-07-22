import { axiosInstance } from "./axiosInstance" ;

//issue a book 
export const IssueBook = async (payload)=> {
    try{
        const response = await axiosInstance.post("/api/issues/issue-new-book",payload);
        return response.data;
    } catch (error) {
        throw error;
    } 
}