import axios from "axios";

const port = "3000";
const baseURL = `http://localhost:${port}`;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
