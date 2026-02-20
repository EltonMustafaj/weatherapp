import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import FavoritesList from './components/FavoritesList';
import HistoryList from './components/HistoryList';
import TemperatureChart from './components/TemperatureChart';
import WeatherMap from './components/WeatherMap';
import WeatherEffects from './components/WeatherEffects';
import { getCurrentWeather, getForecast } from './services/weatherApi';
import {
  loadFavorites,
  saveFavorites,
  loadHistory,
  addToHistory,
  clearHistory as clearHistoryStorage
} from './utils/localStorage';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  // Load favorites and history on mount
  useEffect(() => {
    setFavorites(loadFavorites());
    setHistory(loadHistory());
  }, []);

  const handleSearch = async (city) => {
    console.log('handleSearch called with:', city);
    setLoading(true);
    setError(null);

    try {
      // Fetch both current weather and forecast
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city, 7)
      ]);

      setWeather(weatherData);
      setForecast(forecastData);

      // Add to history
      addToHistory(weatherData.location.name);
      setHistory(loadHistory());
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch: try current location first, then fallback
  useEffect(() => {
    // Use coordinates to avoid API lookup failures for localized city names
    const fallbackCity = '42.6629,21.1655'; // Prishtina coords

    const loadInitialWeather = async () => {
      if (!('geolocation' in navigator)) {
        handleSearch(fallbackCity);
        return;
      }

      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
          });
        });

        const { latitude, longitude } = position.coords;
        handleSearch(`${latitude},${longitude}`);
      } catch {
        console.log('Could not get current location, using fallback location');
        handleSearch(fallbackCity);
      }
    };

    loadInitialWeather();
  }, []);

  const handleAddToFavorites = () => {
    if (!weather) return;

    const cityName = weather.location.name;
    const newFavorites = favorites.includes(cityName)
      ? favorites.filter(fav => fav !== cityName)
      : [...favorites, cityName];

    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const handleRemoveFavorite = (city) => {
    const newFavorites = favorites.filter(fav => fav !== city);
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const handleClearHistory = () => {
    clearHistoryStorage();
    setHistory([]);
  };

  const handleMapClick = ({ lat, lng }) => {
    const query = `${lat},${lng}`;
    handleSearch(query);
  };

  const resolveWeatherTheme = () => {
    const conditionCode = weather?.current?.condition?.code;
    const isDay = weather?.current?.is_day === 1;

    if (!conditionCode) return 'theme-default';

    if (conditionCode === 1000) {
      return isDay ? 'theme-sunny' : 'theme-clear-night';
    }

    if ([1003, 1006, 1009, 1030, 1135, 1147].includes(conditionCode)) {
      return 'theme-cloudy';
    }

    if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(conditionCode)) {
      return 'theme-rainy';
    }

    if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(conditionCode)) {
      return 'theme-snowy';
    }

    if ([1087, 1273, 1276, 1279, 1282].includes(conditionCode)) {
      return 'theme-stormy';
    }

    return 'theme-cloudy';
  };

  const isFavorite = weather && favorites.includes(weather.location.name);
  const weatherThemeClass = resolveWeatherTheme();

  return (
    <div className={`app ${weatherThemeClass}`}>
      {/* Weather Effects Overlay */}
      {weather && (
        <WeatherEffects
          conditionCode={weather.current.condition.code}
          isDay={weather.current.is_day === 1}
        />
      )}
      <div className="app-contrast-layer"></div>
      <div className="app-bg-orb"></div>
      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <h1 className="app-title">
            <span className="app-title-emoji">☀️</span>
            <span className="app-title-text">Moti Sot</span>
          </h1>
          <p className="app-subtitle">Zbulo motin në çdo qytet të botës</p>
        </header>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {/* Main Content */}
        <div className="main-content">
          {/* Weather Section */}
          <div className="weather-section">
            {loading && <LoadingSpinner />}

            {error && !loading && (
              <ErrorMessage
                message={error}
                onRetry={() => handleSearch(history[0]?.city || 'Prishtina')}
              />
            )}

            {weather && !loading && !error && (
              <>
                <WeatherDisplay
                  weather={weather}
                  onAddToFavorites={handleAddToFavorites}
                  isFavorite={isFavorite}
                />
                <WeatherMap
                  lat={weather.location.lat}
                  lon={weather.location.lon}
                  city={weather.location.name}
                  country={weather.location.country}
                  onMapClick={handleMapClick}
                />
              </>
            )}

            {!weather && !loading && !error && (
              <div className="empty-state glass-card">
                <div className="empty-state-icon">🌍</div>
                <h3 className="empty-state-text">Mirë se vini në Moti Sot!</h3>
                <p className="empty-state-subtext">
                  Kërkoni një qytet për të parë motin aktual dhe parashikimin.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            <FavoritesList
              favorites={favorites}
              onSelectCity={handleSearch}
              onRemoveFavorite={handleRemoveFavorite}
            />

            <HistoryList
              history={history}
              onSelectCity={handleSearch}
              onClearHistory={handleClearHistory}
            />
          </div>
        </div>

        {/* Temperature Chart */}
        {forecast && !loading && !error && (
          <div className="chart-section">
            <TemperatureChart forecast={forecast} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
