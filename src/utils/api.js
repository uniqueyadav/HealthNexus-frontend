import axios from "axios";

const API = axios.create({
    baseURL: "https://healthnexus-backend-zip1.onrender.com/api",
});

export default API;