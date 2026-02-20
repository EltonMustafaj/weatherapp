import React from 'react';
import './WeatherEffects.css';

const seededValue = (index, seed) => {
    const value = Math.sin((index + 1) * seed) * 10000;
    return value - Math.floor(value);
};

const createClearNightStars = (count) => {
    return Array.from({ length: count }, (_, index) => ({
        top: `${seededValue(index, 3.17) * 50}%`,
        left: `${seededValue(index, 7.11) * 100}%`,
        animationDelay: `${seededValue(index, 11.29) * 3}s`
    }));
};

const createRainDrops = (count, baseDuration, durationSpread) => {
    return Array.from({ length: count }, (_, index) => ({
        left: `${seededValue(index, 5.33) * 100}%`,
        animationDuration: `${baseDuration + seededValue(index, 9.41) * durationSpread}s`,
        animationDelay: `${seededValue(index, 13.73) * 2}s`
    }));
};

const createSnowflakes = (count) => {
    return Array.from({ length: count }, (_, index) => ({
        left: `${seededValue(index, 2.97) * 100}%`,
        animationDuration: `${3 + seededValue(index, 4.87) * 5}s`,
        animationDelay: `${seededValue(index, 8.23) * 5}s`,
        opacity: seededValue(index, 12.61)
    }));
};

const resolveEffect = (conditionCode, isDay) => {
    if (!conditionCode) return null;

    if (conditionCode === 1000) {
        return isDay ? 'sunny' : 'clear-night';
    }

    if ([1003, 1006, 1009, 1030, 1135, 1147].includes(conditionCode)) {
        return 'cloudy';
    }

    if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(conditionCode)) {
        return 'rainy';
    }

    if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(conditionCode)) {
        return 'snowy';
    }

    if ([1087, 1273, 1276, 1279, 1282].includes(conditionCode)) {
        return 'stormy';
    }

    return 'cloudy';
};

const WeatherEffects = ({ conditionCode, isDay }) => {
    const effect = resolveEffect(conditionCode, isDay);

    const clearNightStars = createClearNightStars(20);
    const rainyDrops = createRainDrops(50, 0.5, 0.5);
    const stormDrops = createRainDrops(60, 0.4, 0.3);
    const snowflakes = createSnowflakes(50);

    if (!effect) return null;

    return (
        <div className={`weather-effects-container ${effect}`}>
            {effect === 'sunny' && (
                <div className="sun-container">
                    <div className="sun"></div>
                    <div className="sun-ray r1"></div>
                    <div className="sun-ray r2"></div>
                    <div className="sun-ray r3"></div>
                    <div className="sun-ray r4"></div>
                </div>
            )}

            {effect === 'clear-night' && (
                <div className="stars-container">
                    {clearNightStars.map((style, i) => (
                        <div key={i} className="star" style={style}></div>
                    ))}
                    <div className="moon"></div>
                </div>
            )}

            {effect === 'rainy' && (
                <div className="rain-container">
                    {rainyDrops.map((style, i) => (
                        <div key={i} className="rain-drop" style={style}></div>
                    ))}
                </div>
            )}

            {effect === 'stormy' && (
                <div className="storm-container">
                    <div className="lightning-flash"></div>
                    <div className="rain-container">
                        {stormDrops.map((style, i) => (
                            <div key={i} className="rain-drop storm-drop" style={style}></div>
                        ))}
                    </div>
                </div>
            )}

            {effect === 'snowy' && (
                <div className="snow-container">
                    {snowflakes.map((style, i) => (
                        <div key={i} className="snowflake" style={style}>❄</div>
                    ))}
                </div>
            )}

            {effect === 'cloudy' && (
                <div className="clouds-container">
                    <div className="cloud c1"></div>
                    <div className="cloud c2"></div>
                    <div className="cloud c3"></div>
                </div>
            )}
        </div>
    );
};

export default WeatherEffects;
