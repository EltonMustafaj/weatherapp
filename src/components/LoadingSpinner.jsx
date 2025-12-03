import './LoadingSpinner.css';

const LoadingSpinner = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner">
                <div className="spinner-circle"></div>
                <div className="spinner-sun">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="5" strokeWidth="2" />
                        <line x1="12" y1="1" x2="12" y2="3" strokeWidth="2" strokeLinecap="round" />
                        <line x1="12" y1="21" x2="12" y2="23" strokeWidth="2" strokeLinecap="round" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth="2" strokeLinecap="round" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth="2" strokeLinecap="round" />
                        <line x1="1" y1="12" x2="3" y2="12" strokeWidth="2" strokeLinecap="round" />
                        <line x1="21" y1="12" x2="23" y2="12" strokeWidth="2" strokeLinecap="round" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth="2" strokeLinecap="round" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
            </div>
            <p className="loading-text">Duke ngarkuar të dhënat e motit...</p>
        </div>
    );
};

export default LoadingSpinner;
