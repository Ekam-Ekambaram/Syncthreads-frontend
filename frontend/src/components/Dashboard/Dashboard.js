import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import "./Dashboard.css";

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/dashboard', {
      headers: { 'Authorization': `Bearer ${auth.token}` }
    })
      .then((res) => {
        setCards(res.data.cards);
      })
      .catch(() => {
        alert("User not logged in");
        navigate('/');
      });
  }, [auth, navigate]);

  const openMapView = (id) => {
    navigate(`/map/${id}`);
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="card-container">
        {cards.map((card) => (
          <div key={card.id} className="card" onClick={() => openMapView(card.id)}>
            {card.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
