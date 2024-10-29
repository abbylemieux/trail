

export const fetchTrailData = async (query) => {
    const url = `${process.env.TRAIL_API_BASE_URL}/search?q=${query}&key=${process.env.TRAIL_API_BASE_URL}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error fetching trail data');
    return response.json();
  };
  
  export const fetchWeatherData = async (lat, lon) => {
    const url = `${process.env.WEATHER_API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_BASE_URL}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error fetching weather data');
    return response.json();
  };
  
