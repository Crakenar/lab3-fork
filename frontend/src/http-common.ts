import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL_DOCKER ?? 'http://localhost:3000',
  withCredentials: true,
});

export default http;