import axios from "axios";
const API_URL = import.meta.env.VITE_API;
 
export const create = async (form:object) => {
    return await axios.post(`${API_URL}/createblog`, form);
}
export const getList = async () => {
    return await axios.get(`${API_URL}/getallblog`);
}
export const getblogbyslug = async (slug:string) => {
    return await axios.get(`${API_URL}/getblog/${slug}`);
}
export const getblogbyid = async (id:string) => {
    return await axios.get(`${API_URL}/myblog/${id}`);
}
export const getblogeditbyid = async (id:string) => {
    return await axios.get(`${API_URL}/blogedit/${id}`);
}
export const update = async (id:string, data:object) =>{
    return await axios.put(`${API_URL}/editblog/${id}`,data);
}
export const remove = async (id:string) => {
    return await axios.delete(`${API_URL}/deleteblog/${id}`);
}