import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const getAuthHeaders = () => {
const token = localStorage.getItem('token');
return token ? { Authorization: `Bearer ${token}` } : {};
};
export const getBackendMessage = async () => {
const response = await axios.get(`${apiUrl}/data`, { headers: getAuthHeaders() });
return response.data;
};
export const fetchTrailData = async (query) => {
const response = await axios.post(`${apiUrl}/trails`, { query }, { headers: getAuthHeaders() });
return response.data;
};
export const fetchWeatherData = async (latitude, longitude) => {
const response = await axios.get(`${apiUrl}/weather`, {
params: { latitude, longitude },
headers: getAuthHeaders(),
});
return response.data;
};
