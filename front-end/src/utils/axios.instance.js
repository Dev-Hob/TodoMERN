import axios from "axios";

const instance = axios.create({
    baseURL: 'http://www.localhost:3001',
    headers: {
    "Access-Control-Allow-Origin": 'http://localhost:3000'
    },
    withCredentials: true,
    });
  
export default instance;