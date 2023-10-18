import React, { useEffect, useState } from 'react';
import { TiWeatherCloudy, TiWeatherSunny, TiWeatherShower, TiWeatherSnow, TiThermometer, TiWeatherRain, TiArrowForwardOutline } from 'react-icons/ti';
import './home.css';
import { getWeatherData } from '../Utilities/utils';

const Weather = () => {
  const [city, setCity] = useState('Nairobi');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeatherData = async () => {
    try {
      const result = await getWeatherData(city);
      console.log('API Response:', result);
      setWeatherData(result);
      setError('');
    } catch (error) {
      setWeatherData(null);
      setError('Failed to fetch weather data.');
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case 'Clouds':
        return <TiWeatherCloudy style={{ color: 'gray', fontSize: '150px', marginLeft:'80px' }} />;
      case 'Clear':
        return <TiWeatherSunny style={{ color: 'yellow', fontSize: '150px' }} />;
      case 'Rain':
        return <TiWeatherShower style={{ color: 'rgb(0, 162, 255)', fontSize: '150px' }} />;
      case 'Snow':
        return <TiWeatherSnow style={{ color: 'white', fontSize: '150px' }} />;
      default:
        return null;
    }
  };

  return (
    <div className="body">
      <h1>ClimateSasa</h1>
      <div className="weather-container">
        <div className="image-container">
          <img src="/Images/sunset.jpg" alt="sunset Image" className="background-image" />
          <img src="/Images/sunset.jpg" alt="overlay Image" className="overlay-image" />
          <div className="catchy-words">
            <h2>STAY INFORMED ABOUT THE WEATHER</h2>
            <img src="/Images/icons.png" className='icons'/>
            <div className='timedate'>
              <p id='time'>{new Date().toLocaleTimeString()}</p>
              <p id='date'>{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit} className="search">
            <input
              className={`input ${city === 'Nairobi' ? 'default-city' : ''}`}
              type="text"
              placeholder="Enter a city name..."
              value={city}
              onChange={handleInputChange}
            />
            <button className="button" type="submit">
              Search
            </button>
          </form>
        
          {error && <p>{error}</p>}
          {weatherData && weatherData.main && (
            <div className="weather-data">
              <div className="weather-item">
                <p id="city">City:</p>
                <p className="weather-value1">{weatherData.name}</p>
              </div>
              <div className="weather-item rectangle1">
              
                <p className="weather-label"><TiThermometer/> Temperature:</p>
                <p className="weather-value2">{weatherData.main.temp}</p>
              </div>
              <div className="weather-item rectangle2">
                <p className="weather-label"><TiWeatherCloudy /> Humidity:</p>
                <p className="weather-value">{weatherData.main.humidity}</p>
              </div>
              <div className="weather-item rectangle3">
                <p className="weather-label"><TiWeatherCloudy /> Weather:</p>
                <p className="weather-value">{weatherData.weather[0].description}</p>
              </div>
              <div className="weather-item rectangle4">
                <p className="weather-label"><TiArrowForwardOutline /> Wind Speed:</p>
                <p className="weather-value4">{weatherData.wind.speed}</p>
              </div>
              <div className="weather-icon">
                {getWeatherIcon(weatherData.weather[0].main)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;

