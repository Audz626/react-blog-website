import axios from "axios";
const API_URL = import.meta.env.VITE_API;

export const getList = async () => {
  return await axios.get(`${API_URL}/product`);
};

export const remove = async (id: string) => {
  return await axios.delete(`${API_URL}/product/${id}`);
};

export const save = async (form: object) =>{
    return await axios.post(`${API_URL}/product/`,form);
}
export const getByid = async (id:string) =>{
    return await axios.get(`${API_URL}/product/${id}`);
}
export const update = async (id:string, data:object) =>{
    return await axios.put(`${API_URL}/product/${id}`,data);
}