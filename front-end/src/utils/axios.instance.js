import axios from "axios";

const instance = axios.create({
    baseURL: '44.229.200.200',
    headers: {
    "Access-Control-Allow-Origin": 'http://localhost:3000'
    },
    withCredentials: true,
    });
  
export default instance;