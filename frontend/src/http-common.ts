import axios from 'axios';

const http = axios.create({
  baseURL: "http://localhost:3001", // replace with your API base URL
  withCredentials: true, // this will allow cookies
});

export default http;