import axios from 'axios';

const api = axios.create({
  baseURL: 'https://traguild.kro.kr/api',
  headers: { 'Content-Type': 'application/json' }
});

export default api;