import axios from "axios"
const api = axios.create({
    baseURL:"http://localhost:5000/api"
})
//request interceptors
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token")
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
})

//response interceptors

export default api;