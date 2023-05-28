import axios from 'axios';

export const apiServiceInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_SERVER,
  timeout: 30000,
})

