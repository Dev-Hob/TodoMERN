import axios from "axios";

const instance = axios.create({
    baseURL: 'todo-backend-9cyp.onrender.com',
    headers: {
    "Access-Control-Allow-Origin": 'https://melodious-sorbet-9c8d04.netlify.app/'
    },
    withCredentials: true,
    });
  
export default instance;