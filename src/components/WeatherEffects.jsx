import React, { useEffect, useState } from 'react';
import './WeatherEffects.css';

const WeatherEffects = ({ conditionCode, isDay }) => {
    const [effect, setEffect] = useState(null);

    useEffect(() => {
        // Determine effect based on condition code
        // https://www.weatherapi.com/docs/weather_conditions.json
        if (!conditionCode) return;

        const code = conditionCode;

        if (code === 1000) {
            setEffect(isDay ? 'sunny' : 'clear-night');
        } else if (
            [1003, 1006, 1009, 1030, 1135, 1147].includes(code)
        ) {
            setEffect('cloudy');
        } else if (
            [1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(code)
        ) {
            setEffect('rainy');
        } else if (
            [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)
        ) {
            setEffect('snowy');
        } else if (
            [1087, 1273, 1276, 1279, 1282].includes(code)
        ) {
            setEffect('stormy');
        } else {
            setEffect('cloudy'); // Default fallback
        }
    }, [conditionCode, isDay]);

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
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="star" style={{
                            top: `${Math.random() * 50}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`
                        }}></div>
                    ))}
                    <div className="moon"></div>
                </div>
            )}

            {effect === 'rainy' && (
                <div className="rain-container">
                    {[...Array(50)].map((_, i) => (
                        <div key={i} className="rain-drop" style={{
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${0.5 + Math.random() * 0.5}s`,
                            animationDelay: `${Math.random() * 2}s`
                        }}></div>
                    ))}
                </div>
            )}

            {effect === 'stormy' && (
                <div className="storm-container">
                    <div className="lightning-flash"></div>
                    <div className="rain-container">
                        {[...Array(60)].map((_, i) => (
                            <div key={i} className="rain-drop storm-drop" style={{
                                left: `${Math.random() * 100}%`,
                                animationDuration: `${0.4 + Math.random() * 0.3}s`,
                                animationDelay: `${Math.random() * 2}s`
                            }}></div>
                        ))}
                    </div>
                </div>
            )}

            {effect === 'snowy' && (
                <div className="snow-container">
                    {[...Array(50)].map((_, i) => (
                        <div key={i} className="snowflake" style={{
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${3 + Math.random() * 5}s`,
                            animationDelay: `${Math.random() * 5}s`,
                            opacity: Math.random()
                        }}>❄</div>
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
