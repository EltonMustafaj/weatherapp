import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

/**
 * Get current weather for a city
 * @param {string} city - City name
 * @returns {Promise<Object>} Weather data
 */
export const getCurrentWeather = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/current.json`, {
            params: {
                key: API_KEY,
                q: city,
                aqi: 'no'
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            // API responded with error
            const errorMsg = error.response.data.error.message;
            if (errorMsg.includes('No matching location')) {
                throw new Error('Qyteti nuk u gjet! Ju lutemi përdorni sugjerimet që shfaqen kur shkruani.');
            }
            throw new Error(errorMsg || 'Qyteti nuk u gjet');
        } else if (error.request) {
            // Network error
            throw new Error('Gabim në rrjet. Ju lutemi kontrolloni lidhjen tuaj.');
        } else {
            throw new Error('Ndodhi një gabim i papritur');
        }
    }
};

/**
 * Get weather forecast for a city
 * @param {string} city - City name
 * @param {number} days - Number of days (1-10)
 * @returns {Promise<Object>} Forecast data
 */
export const getForecast = async (city, days = 7) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast.json`, {
            params: {
                key: API_KEY,
                q: city,
                days: Math.min(days, 10), // API max is 10 days
                aqi: 'no'
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error.message || 'City not found');
        } else if (error.request) {
            throw new Error('Network error. Please check your connection.');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};

/**
 * Search for cities (autocomplete)
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of matching cities
 */
export const searchCities = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/search.json`, {
            params: {
                key: API_KEY,
                q: query
            }
        });
        return response.data;
    } catch (error) {
        console.error('City search error:', error);
        return [];
    }
};
