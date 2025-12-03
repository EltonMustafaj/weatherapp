import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './WeatherMap.css';
import L from 'leaflet';

// Fix for default marker icon in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to update map center when coordinates change
function ChangeView({ center }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 10);
    }, [center, map]);
    return null;
}

// Component to handle map clicks
function MapClickHandler({ onMapClick }) {
    useMapEvents({
        click: (e) => {
            onMapClick(e.latlng);
        },
    });
    return null;
}

const WeatherMap = ({ lat, lon, city, country, onMapClick }) => {
    if (!lat || !lon) return null;

    const position = [lat, lon];

    return (
        <div className="map-container glass-card">
            <h3 className="map-title">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Vendndodhja (Kliko në hartë për të parë motin)
            </h3>
            <div className="map-wrapper">
                <MapContainer
                    center={position}
                    zoom={10}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%', zIndex: 0 }}
                >
                    <ChangeView center={position} />
                    <MapClickHandler onMapClick={onMapClick} />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            <div className="map-popup">
                                <strong>{city}</strong><br />
                                {country}
                            </div>
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default WeatherMap;
