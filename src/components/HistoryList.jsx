import './HistoryList.css';

const HistoryList = ({ history, onSelectCity, onClearHistory }) => {
    if (history.length === 0) {
        return (
            <div className="history-list glass-card">
                <h3 className="list-title">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Historiku
                </h3>
                <div className="empty-state">
                    <p>Nuk keni kërkime të fundit.</p>
                </div>
            </div>
        );
    }

    const formatTime = (timestamp) => {
        const now = Date.now();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Tani';
        if (minutes < 60) return `${minutes} min më parë`;
        if (hours < 24) return `${hours} orë më parë`;
        return `${days} ditë më parë`;
    };

    return (
        <div className="history-list glass-card">
            <div className="history-header">
                <h3 className="list-title">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Historiku ({history.length})
                </h3>
                <button className="clear-button" onClick={onClearHistory}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Pastro
                </button>
            </div>
            <div className="history-items">
                {history.map((item, index) => (
                    <button
                        key={index}
                        className="history-item"
                        onClick={() => onSelectCity(item.city)}
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        <div className="history-city">
                            <svg className="history-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {item.city}
                        </div>
                        <span className="history-time">{formatTime(item.timestamp)}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HistoryList;
