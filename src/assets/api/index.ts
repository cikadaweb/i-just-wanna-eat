import axios from 'axios';

const defaultConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
      'Content-Type': 'application/json',
  },
}

export const DefaultAPIInstance = axios.create(defaultConfig);