import store from "../redux/store";
import axios from "axios";
const url = "http://localhost:8000/"
const instance = axios.create({
        baseURL : url,
    });
console.log(instance)
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        console.log(token)
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;

