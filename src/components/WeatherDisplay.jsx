import { useState } from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({ weather, onAddToFavorites, isFavorite }) => {
    const [showTooltip, setShowTooltip] = useState(null);

    if (!weather) return null;

    const { location, current } = weather;

    // Determine weather condition for dynamic styling
    const getWeatherClass = () => {
        const condition = current.condition.text.toLowerCase();
        if (condition.includes('sun') || condition.includes('clear')) return 'sunny';
        if (condition.includes('rain') || condition.includes('drizzle')) return 'rainy';
        if (condition.includes('cloud') || condition.includes('overcast')) return 'cloudy';
        if (condition.includes('snow')) return 'snowy';
        return 'default';
    };

    return (
        <div className={`weather-display glass-card ${getWeatherClass()}`}>
            {/* Location Header */}
            <div className="weather-header">
                <div className="location-info">
                    <h2 className="city-name">{location.name}</h2>
                    <p className="country-name">{location.country}</p>
                    <p className="local-time">
                        <svg className="time-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {new Date(location.localtime).toLocaleString('sq-AL', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                </div>
                <button
                    className={`favorite-button ${isFavorite ? 'active' : ''}`}
                    onClick={onAddToFavorites}
                    onMouseEnter={() => setShowTooltip('favorite')}
                    onMouseLeave={() => setShowTooltip(null)}
                >
                    <svg fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {showTooltip === 'favorite' && (
                        <span className="tooltip">
                            {isFavorite ? 'Hiq nga të preferuarat' : 'Shto te të preferuarat'}
                        </span>
                    )}
                </button>
            </div>

            {/* Main Weather Info */}
            <div className="weather-main">
                <div className="temperature-section">
                    <div className="temperature-display">
                        <span className="temperature">{Math.round(current.temp_c)}</span>
                        <span className="temperature-unit">°C</span>
                    </div>
                    <div
                        className="feels-like"
                        onMouseEnter={() => setShowTooltip('feels')}
                        onMouseLeave={() => setShowTooltip(null)}
                    >
                        Ndihet si {Math.round(current.feelslike_c)}°C
                        {showTooltip === 'feels' && (
                            <span className="tooltip">Temperatura e ndjeshme</span>
                        )}
                    </div>
                </div>

                <div className="condition-section">
                    <img
                        src={`https:${current.condition.icon}`}
                        alt={current.condition.text}
                        className="weather-icon"
                    />
                    <p className="condition-text">{current.condition.text}</p>
                </div>
            </div>

            {/* Weather Details Grid */}
            <div className="weather-details">
                <div
                    className="detail-item"
                    onMouseEnter={() => setShowTooltip('humidity')}
                    onMouseLeave={() => setShowTooltip(null)}
                >
                    <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                    <div className="detail-content">
                        <span className="detail-label">Lagështia</span>
                        <span className="detail-value">{current.humidity}%</span>
                    </div>
                    {showTooltip === 'humidity' && (
                        <span className="tooltip">Lagështia relative e ajrit</span>
                    )}
                </div>

                <div
                    className="detail-item"
                    onMouseEnter={() => setShowTooltip('wind')}
                    onMouseLeave={() => setShowTooltip(null)}
                >
                    <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <div className="detail-content">
                        <span className="detail-label">Era</span>
                        <span className="detail-value">{current.wind_kph} km/h</span>
                    </div>
                    {showTooltip === 'wind' && (
                        <span className="tooltip">Shpejtësia e erës - {current.wind_dir}</span>
                    )}
                </div>

                <div
                    className="detail-item"
                    onMouseEnter={() => setShowTooltip('pressure')}
                    onMouseLeave={() => setShowTooltip(null)}
                >
                    <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <div className="detail-content">
                        <span className="detail-label">Presioni</span>
                        <span className="detail-value">{current.pressure_mb} mb</span>
                    </div>
                    {showTooltip === 'pressure' && (
                        <span className="tooltip">Presioni atmosferik</span>
                    )}
                </div>

                <div
                    className="detail-item"
                    onMouseEnter={() => setShowTooltip('visibility')}
                    onMouseLeave={() => setShowTooltip(null)}
                >
                    <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <div className="detail-content">
                        <span className="detail-label">Dukshmëria</span>
                        <span className="detail-value">{current.vis_km} km</span>
                    </div>
                    {showTooltip === 'visibility' && (
                        <span className="tooltip">Dukshmëria horizontale</span>
                    )}
                </div>
            </div>

            {/* UV Index */}
            <div className="uv-index">
                <span className="uv-label">Indeksi UV:</span>
                <div className="uv-bar">
                    <div
                        className="uv-fill"
                        style={{ width: `${(current.uv / 11) * 100}%` }}
                    ></div>
                </div>
                <span className="uv-value">{current.uv}</span>
            </div>
        </div>
    );
};

export default WeatherDisplay;
