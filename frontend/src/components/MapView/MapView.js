import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import 'leaflet/dist/leaflet.css'; // Add Leaflet CSS
import './MapView.css';

const MapView = () => {
  const { cardId } = useParams();
  const { auth } = useContext(AuthContext);
  const [mapData, setMapData] = useState({ 
    center: [20.5937, 78.9629], 
    zoom: 5 
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://syncthreads-backend.onrender.com/api/mapview/${cardId}`, {
      headers: { 'Authorization': `Bearer ${auth.token}` }
    })
      .then((res) => {
        const { center, zoom } = res.data;
        setMapData({ 
          center: [center.lat, center.lng], 
          zoom: zoom || 5 
        });
      })
      .catch(() => {
        setError("Failed to load map data");
      });
  }, [cardId, auth.token]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="map-view">
      <h2>Map View</h2>
      <div className="map-container">
        <MapContainer 
          center={mapData.center} 
          zoom={mapData.zoom} 
          className="custom-map"
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;