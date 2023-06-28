import React, { useState } from 'react';

export default function WeatherWidget() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const API_KEY = 'fa727addfc89359445ee873713740585';

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.log('Error fetching weather data:', error);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
    setCity('');
  };

  return (
    <div>
      <h2>Weather Widget</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData ? (
        <div>
          <p>City: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
}
