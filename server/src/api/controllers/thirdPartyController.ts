import { Request, Response } from 'express';
import { fetchTrailData, fetchWeatherData } from '../services/thirdPartyService';
import axios from 'axios';

export const getTrails = async (req: Request, res: Response) => {
    try {
        const { query } = req.body;
        const trailData = await fetchTrailData(query);
        res.status(200).json(trailData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from API 1' });
    }
};

export const getWeather = async (req: Request, res: Response) => {
    try {
        const { latitude, longitutde } = req.query;
        const weatherData = await fetchWeatherData({
            latitude: Number(latitude),
            longitude: Number(longitutde),
            hourly: 'temperature_2m',
        }); 
        res.status(200).json(weatherData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weather data' });
    }
};
