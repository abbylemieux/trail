import axios from 'axios';

/**
 * Fetch data from the first third-party API.
 * @returns {Promise<any>} - The data retrieved from the API.
 */
export const fetchFromApi1 = async (): Promise<any> => {
    try {
        const response = await axios.get('https://api1.example.com/data', {
            headers: {
                'Authorization': `Bearer ${process.env.API1_TOKEN}`,
                'Accept': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from API 1:', error);
        throw new Error('Failed to fetch data from API 1');
    }
};

/**
 * Fetch data from the second third-party API.
 * @returns {Promise<any>} - The data retrieved from the API.
 */
export const fetchFromApi2 = async (): Promise<any> => {
    try {
        const response = await axios.get('https://api2.example.com/data', {
            headers: {
                'Authorization': `Bearer ${process.env.API2_TOKEN}`,
                'Accept': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from API 2:', error);
        throw new Error('Failed to fetch data from API 2');
    }
};
