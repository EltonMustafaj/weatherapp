import './FavoritesList.css';

const FavoritesList = ({ favorites, onSelectCity, onRemoveFavorite }) => {
    if (favorites.length === 0) {
        return (
            <div className="favorites-list glass-card">
                <h3 className="list-title">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Të Preferuarat
                </h3>
                <div className="empty-state">
                    <p>Nuk keni qytete të preferuara ende.</p>
                    <p className="empty-hint">Klikoni ❤️ për të shtuar një qytet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-list glass-card">
            <h3 className="list-title">
                <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Të Preferuarat ({favorites.length})
            </h3>
            <div className="favorites-grid">
                {favorites.map((city, index) => (
                    <div
                        key={index}
                        className="favorite-item"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <button
                            className="favorite-city-button"
                            onClick={() => onSelectCity(city)}
                        >
                            <svg className="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {city}
                        </button>
                        <button
                            className="remove-button"
                            onClick={() => onRemoveFavorite(city)}
                            title="Hiq nga të preferuarat"
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoritesList;
