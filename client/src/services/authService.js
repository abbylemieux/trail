import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// User authentication functions
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
        if (!response.data.token) {
            throw new Error('Token not received in login response');
        }
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Login failed');
    }
};

export const register = async (name, email, password) => {
    try {
        const response = await axios.post(`${apiUrl}/auth/register`, { name, email, password });
        if (!response.data.token) {
            throw new Error('Token not received in registration response');
        }
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw new Error('Registration failed');
    }
};

export const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token not found in localStorage');
        throw new Error('Token retrieval failed');
    }
    return token;
};

export const logout = () => {
    try {
        localStorage.removeItem('token');
    } catch (error) {
        console.error('Logout failed:', error);
        throw new Error('Logout failed');
    }
};

// Trail API function
export const fetchTrailData = async (location, otherParams) => {
    const trailApiUrl = import.meta.env.VITE_TRAIL_API_URL; // Ensure this is set in your environment variables
    const trailApiKey = import.meta.env.VITE_TRAIL_API_KEY;

    try {
        const response = await axios.get(`${trailApiUrl}/trails`, {
            params: {
                location,
                ...otherParams,
                key: trailApiKey
            }
        });
        return response.data;
    } catch (error) {
        console.error('Trail API call failed:', error);
        throw new Error('Failed to fetch trail data');
    }
};

// Weather API function
export const fetchWeatherData = async (latitude, longitude) => {
    const weatherApiUrl = import.meta.env.VITE_WEATHER_API_URL; // Ensure this is set in your environment variables

    try {
        const response = await axios.get(`${weatherApiUrl}/weather`, {
            params: {
                lat: latitude,
                lon: longitude,
                appid: weatherApiKey,
                units: 'metric' // Adjust units as needed (e.g., 'imperial' for Fahrenheit)
            }
        });
        return response.data;
    } catch (error) {
        console.error('Weather API call failed:', error);
        throw new Error('Failed to fetch weather data');
    }
};