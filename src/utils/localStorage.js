// LocalStorage utility functions for Weather App

const FAVORITES_KEY = 'weatherAppFavorites';
const HISTORY_KEY = 'weatherAppHistory';

/**
 * Save favorites to localStorage
 * @param {Array<string>} favorites - Array of city names
 */
export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

/**
 * Load favorites from localStorage
 * @returns {Array<string>} Array of city names
 */
export const loadFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

/**
 * Save search history to localStorage
 * @param {Array<Object>} history - Array of {city, timestamp} objects
 */
export const saveHistory = (history) => {
  try {
    // Keep only last 10 items
    const limitedHistory = history.slice(0, 10);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
  } catch (error) {
    console.error('Error saving history:', error);
  }
};

/**
 * Load search history from localStorage
 * @returns {Array<Object>} Array of {city, timestamp} objects
 */
export const loadHistory = () => {
  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
};

/**
 * Add city to favorites
 * @param {string} city - City name to add
 */
export const addToFavorites = (city) => {
  const favorites = loadFavorites();
  if (!favorites.includes(city)) {
    favorites.push(city);
    saveFavorites(favorites);
  }
};

/**
 * Remove city from favorites
 * @param {string} city - City name to remove
 */
export const removeFromFavorites = (city) => {
  const favorites = loadFavorites();
  const updated = favorites.filter(fav => fav !== city);
  saveFavorites(updated);
};

/**
 * Add city to search history
 * @param {string} city - City name to add
 */
export const addToHistory = (city) => {
  const history = loadHistory();
  // Remove if already exists to avoid duplicates
  const filtered = history.filter(item => item.city !== city);
  // Add to beginning
  filtered.unshift({ city, timestamp: Date.now() });
  saveHistory(filtered);
};

/**
 * Clear all search history
 */
export const clearHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
};
