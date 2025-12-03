import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import './TemperatureChart.css';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const TemperatureChart = ({ forecast }) => {
    if (!forecast || !forecast.forecast || !forecast.forecast.forecastday) {
        return null;
    }

    const forecastDays = forecast.forecast.forecastday;

    // Prepare chart data
    const labels = forecastDays.map(day => {
        const date = new Date(day.date);
        return date.toLocaleDateString('sq-AL', { weekday: 'short', day: 'numeric', month: 'short' });
    });

    const maxTemps = forecastDays.map(day => day.day.maxtemp_c);
    const minTemps = forecastDays.map(day => day.day.mintemp_c);
    const avgTemps = forecastDays.map(day => day.day.avgtemp_c);

    const data = {
        labels,
        datasets: [
            {
                label: 'Maks',
                data: maxTemps,
                borderColor: 'rgba(246, 211, 101, 1)',
                backgroundColor: 'rgba(246, 211, 101, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: 'rgba(246, 211, 101, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
            },
            {
                label: 'Mesatare',
                data: avgTemps,
                borderColor: 'rgba(102, 126, 234, 1)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
            },
            {
                label: 'Min',
                data: minTemps,
                borderColor: 'rgba(79, 172, 254, 1)',
                backgroundColor: 'rgba(79, 172, 254, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: 'rgba(79, 172, 254, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: 'rgba(255, 255, 255, 0.9)',
                    font: {
                        size: 12,
                        family: 'Inter',
                    },
                    padding: 15,
                    usePointStyle: true,
                    pointStyle: 'circle',
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'rgba(255, 255, 255, 0.9)',
                bodyColor: 'rgba(255, 255, 255, 0.9)',
                borderColor: 'rgba(102, 126, 234, 0.5)',
                borderWidth: 1,
                padding: 12,
                displayColors: true,
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.parsed.y}°C`;
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    drawBorder: false,
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                        size: 11,
                        family: 'Inter',
                    },
                },
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    drawBorder: false,
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                        size: 11,
                        family: 'Inter',
                    },
                    callback: function (value) {
                        return value + '°C';
                    },
                },
            },
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
    };

    return (
        <div className="temperature-chart glass-card">
            <h3 className="chart-title">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Parashikimi {forecastDays.length}-Ditor
            </h3>
            <div className="chart-container">
                <Line data={data} options={options} />
            </div>
            <div className="forecast-cards">
                {forecastDays.map((day, index) => (
                    <div key={index} className="forecast-card" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="forecast-date">
                            {new Date(day.date).toLocaleDateString('sq-AL', { weekday: 'short' })}
                        </div>
                        <img
                            src={`https:${day.day.condition.icon}`}
                            alt={day.day.condition.text}
                            className="forecast-icon"
                        />
                        <div className="forecast-temps">
                            <span className="temp-max">{Math.round(day.day.maxtemp_c)}°</span>
                            <span className="temp-min">{Math.round(day.day.mintemp_c)}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemperatureChart;
