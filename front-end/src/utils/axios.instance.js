import axios from "axios";

const instance = axios.create({
    baseURL: 'todo-backend-9cyp.onrender.com',
    withCredentials: true,
    });
  
export default instance;