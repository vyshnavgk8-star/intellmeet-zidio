import axios from "axios";

const api = axios.create({
    baseURL: "https://intellmeet-zidio.onrender.com/api",
});

export default api;