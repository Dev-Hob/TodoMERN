import axios from "axios";

const instance = axios.create({
    baseURL: 'https://todo-backend-9cyp.onrender.com',
    headers: {
    "Access-Control-Allow-Origin": '44.229.200.200'
    },
    withCredentials: true,
    });
  
export default instance;