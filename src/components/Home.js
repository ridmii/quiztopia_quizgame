import React from 'react';
import { useNavigate } from 'react-router-dom'; // if using React Router for navigation
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/game'); // Navigates to the game board
  };

  return (
    <div className="home-container">
      <video className="background-video" autoPlay loop muted>
        <source src="home.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1>Welcome to Quiz-topia!</h1>
        <button onClick={startGame}>Start Game</button>
      </div>
    </div>
  );
}

export default Home;
