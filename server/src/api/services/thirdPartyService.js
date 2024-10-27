"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWeatherData = exports.fetchTrailData = void 0;
const axios_1 = __importDefault(require("axios"));
const thirdPartyConfig_1 = require("../../config/thirdPartyConfig");
/**
 * Fetch data from the first third-party API.
 * @returns {Promise<any>} - The data retrieved from the API.
 */
const fetchTrailData = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(thirdPartyConfig_1.trailApiConfig.baseUrl, { query }, {
            headers: {
                'x-algolia-api-key': thirdPartyConfig_1.trailApiConfig.apiKey,
                'x-algolia-application-id': thirdPartyConfig_1.trailApiConfig.applicationId,
                'x-algolia-agent': thirdPartyConfig_1.trailApiConfig.agent,
            },
        });
        if (response.status === 200) {
            console.log('Trail data fetched successfully');
            return response.data;
        }
        else {
            throw new Error(`Trail API returned status code ${response.status}`);
        }
    }
    catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch trail data');
    }
});
exports.fetchTrailData = fetchTrailData;
/**
 * Fetch data from the second third-party API.
 * @returns {Promise<any>} - The data retrieved from the API.
 */
const fetchWeatherData = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(thirdPartyConfig_1.weatherApiConfig.baseUrl, {
            params: {
                latitude: params.latitude,
                longitude: params.longitude,
                hourly: params.hourly,
            },
        });
        if (response.status === 200) {
            console.log('Weather data fetched successfully');
            return response.data;
        }
        else {
            throw new Error(`Weather API returned status code ${response.status}`);
        }
    }
    catch (error) {
        console.error('Error fetching weather:', error);
        throw new Error('Failed to fetch weather data');
    }
});
exports.fetchWeatherData = fetchWeatherData;
