import axios from 'axios'
export const axiosPrivate = axios.create({baseURL:"http://localhost:8000/api",withCredentials:true})