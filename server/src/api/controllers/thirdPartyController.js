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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeather = exports.getTrails = void 0;
const thirdPartyService_1 = require("../services/thirdPartyService");
const getTrails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.body;
        const trailData = yield (0, thirdPartyService_1.fetchTrailData)(query);
        res.status(200).json(trailData);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching data from API 1' });
    }
});
exports.getTrails = getTrails;
const getWeather = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { latitude, longitutde } = req.query;
        const weatherData = yield (0, thirdPartyService_1.fetchWeatherData)({
            latitude: Number(latitude),
            longitude: Number(longitutde),
            hourly: 'temperature_2m',
        });
        res.status(200).json(weatherData);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching weather data' });
    }
});
exports.getWeather = getWeather;
