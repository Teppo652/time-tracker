import axios from "axios";

//baseURL: process.env.VUE_APP_API_URL || "http://localhost:5173",
// baseURL: "http://localhost:5173",
//const API_URL = process.env.VUE_APP_API_URL + "/employees";

const port = "3000";
const baseURL = `http://localhost:${port}`;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
