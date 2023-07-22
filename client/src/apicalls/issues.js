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
// get issues
export const GetIssues = async (payload) => {
    try {
      const response = await axiosInstance.post("/api/issues/get-issues" , payload);
      return response.data;
    } catch (error) {
      throw error;
    }
}
// return a book
export const ReturnBook = async (payload) => {
    try {
      const response = await axiosInstance.post("/api/issues/return-book", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
}
