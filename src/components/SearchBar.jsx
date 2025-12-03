import { useState, useEffect, useRef } from 'react';
import { searchCities } from '../services/weatherApi';
import './SearchBar.css';

const KOSOVO_CITIES = [
    { name: 'Prishtina', region: 'Prishtina', country: 'Kosovo' },
    { name: 'Prizren', region: 'Prizren', country: 'Kosovo' },
    { name: 'Peja', region: 'Peja', country: 'Kosovo' },
    { name: 'Gjakova', region: 'Gjakova', country: 'Kosovo' },
    { name: 'Mitrovica', region: 'Mitrovica', country: 'Kosovo' },
    { name: 'Ferizaj', region: 'Ferizaj', country: 'Kosovo' },
    { name: 'Gjilan', region: 'Gjilan', country: 'Kosovo' },
    { name: 'Vushtrri', region: 'Mitrovica', country: 'Kosovo' },
    { name: 'Podujeva', region: 'Prishtina', country: 'Kosovo' }
];

const SearchBar = ({ onSearch, isLoading }) => {
    const [city, setCity] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [gettingLocation, setGettingLocation] = useState(false);
    const searchRef = useRef(null);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch suggestions when user types
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (city.length >= 1) {
                // 1. Filter local Kosovo cities first
                const localMatches = KOSOVO_CITIES.filter(c =>
                    c.name.toLowerCase().includes(city.toLowerCase())
                );

                // 2. Fetch API suggestions if input is longer
                let apiMatches = [];
                if (city.length >= 2) {
                    apiMatches = await searchCities(city);
                }

                // 3. Combine results (Local first, then API, removing duplicates)
                const combined = [...localMatches];
                const existingNames = new Set(localMatches.map(c => c.name.toLowerCase()));

                apiMatches.forEach(match => {
                    if (!existingNames.has(match.name.toLowerCase())) {
                        combined.push(match);
                    }
                });

                setSuggestions(combined);
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        };

        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [city]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('SearchBar handleSubmit called, city:', city);
        if (city.trim()) {
            console.log('Calling onSearch with:', city.trim());
            onSearch(city.trim());
            setShowSuggestions(false);
        } else {
            console.log('City is empty, not searching');
        }
    };

    const handleSuggestionClick = (suggestion) => {
        const cityName = suggestion.name;
        setCity(cityName);
        onSearch(cityName);
        setShowSuggestions(false);
    };

    const handleGetCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('Shfletuesi juaj nuk mbështet gjeolokacionin.');
            return;
        }

        setGettingLocation(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const locationQuery = `${latitude},${longitude}`;
                onSearch(locationQuery);
                setGettingLocation(false);
            },
            (error) => {
                console.error('Geolocation error:', error);
                alert('Nuk mund të merret lokacioni juaj. Ju lutemi sigurohuni që keni dhënë leje.');
                setGettingLocation(false);
            }
        );
    };

    return (
        <div className="search-bar-container" ref={searchRef}>
            <form onSubmit={handleSubmit} className="search-form glass-card">
                <div className="search-input-wrapper">
                    <svg
                        className="search-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Kërko qytetin... (p.sh. Prishtina)"
                        className="search-input"
                        disabled={isLoading || gettingLocation}
                        autoComplete="off"
                    />

                    {/* Autocomplete Suggestions */}
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="suggestions-dropdown">
                            {suggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    <svg className="suggestion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div className="suggestion-text">
                                        <span className="suggestion-name">{suggestion.name}</span>
                                        <span className="suggestion-region">
                                            {suggestion.country === 'Kosovo' ? '🇽🇰 ' : ''}
                                            {suggestion.region}, {suggestion.country}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    className="location-button"
                    onClick={handleGetCurrentLocation}
                    disabled={isLoading || gettingLocation}
                    title="Përdor lokacionin aktual"
                >
                    {gettingLocation ? (
                        <span className="spinner-small"></span>
                    ) : (
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    )}
                </button>

                <button
                    type="submit"
                    className="search-button"
                    disabled={isLoading || !city.trim() || gettingLocation}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner-small"></span>
                            Duke kërkuar...
                        </>
                    ) : (
                        <>
                            <svg
                                className="button-icon"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            Kërko
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
