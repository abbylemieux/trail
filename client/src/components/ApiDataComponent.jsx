import React, { useEffect, useState } from 'react';
import { fetchTrailData, fetchWeatherData } from '../services/apiService';
import '/src/Styles/Api.css'


const ApiDataComponent = () => {
const [trailData, setTrailData] = useState(null);
const [weatherData, setWeatherData] = useState(null);
const [error, setError] = useState(null);

useEffect(() => {
const loadData = async () => {
try {
const trails = await fetchTrailData('mountain');
setTrailData(trails);
const weather = await fetchWeatherData(''); // Example coordinates
setWeatherData(weather);
} catch (err) {
setError('Error fetching data');
}
};
loadData();
}, []);
if (error) return <div>{error}</div>;
return (
<div>
<h2>Trail Data</h2>
<pre>{JSON.stringify(trailData, null, 2)}</pre>
<h2>Weather Data</h2>
<pre>{JSON.stringify(weatherData, null, 2)}</pre>
</div>
);
};
export default ApiDataComponent;