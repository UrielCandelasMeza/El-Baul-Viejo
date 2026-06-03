import axios from "axios";

const prod = import.meta.env.ENVIRONMENT == "production";

const url = prod ? import.meta.env.VITE_API_URL : "";

const instance = axios.create({
  withCredentials: true,
  baseURL: `${url}/api`,
});

export default instance;
