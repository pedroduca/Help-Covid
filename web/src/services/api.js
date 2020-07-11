import axios from "axios";
import { getToken } from "./token";

//trocar aqui seu ip
const api = axios.create({
  baseURL: `http://10.0.0.104:3333`,
});

// antes de todas as requisições ele vai setar uma config
api.interceptors.request.use(async (config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
