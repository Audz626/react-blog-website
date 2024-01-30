/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const API_URL = import.meta.env.VITE_API;

export const getListUser = async (authentication:string) =>{
    return await axios.get(`${API_URL}/get-user`,{
        headers: {authentication}
    })
}
export const changeRole = async (authentication:string, data:object) =>{
    return await axios.post(`${API_URL}/change-role`,{data},{
        headers: {authentication}
    })
}