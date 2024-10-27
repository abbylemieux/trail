"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherApiConfig = exports.trailApiConfig = void 0;
exports.trailApiConfig = {
    baseUrl: process.env.TRAIL_API_BASE_URL || 'https://9ioacg5nhe-dsn.algolia.net/1/indexes/alltrails_primary_en-US/query',
    apiKey: process.env.TRAIL_API_KEY || '',
    applicationId: process.env.TRAIL_API_APPLICATION_ID || '',
    agent: process.env.TRAIL_API_AGENT || 'Algolia%20for%20JavaScript%20(4.14.2)%3B%20Browser',
};
exports.weatherApiConfig = {
    baseUrl: process.env.WEATHER_API_BASE_URL || 'https://api.open-meteo.com/v1/forecast',
};
