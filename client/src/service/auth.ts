/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const API_URL = import.meta.env.VITE_API;

export const register = async (form: object) =>{
    return await axios.post(`${API_URL}/register/`,form);
}
export const login = async (form: object) =>{
    return await axios.post(`${API_URL}/login/`,form);
}
export const chkcurrentUser = async (authentication: any) =>{
    return await axios.post(`${API_URL}/checkcurrent`,{},{
      headers:{authentication}
    });
}
export const chkcurrentAdmin = async (authentication: any) =>{
    return await axios.post(`${API_URL}/checkcurrent-admin`,{},{
      headers:{authentication}
    });
}
