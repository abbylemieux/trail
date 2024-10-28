import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
export const login = async (email, password) => {
const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
localStorage.setItem('token', response.data.token);
return response.data;
};
export const register = async (name, email, password) => {
const response = await axios.post(`${apiUrl}/auth/register`, { name, email, password });
localStorage.setItem('token', response.data.token);
return response.data;
};
export const getToken = () => localStorage.getItem('token');
export const logout = () => {
localStorage.removeItem('token');
};