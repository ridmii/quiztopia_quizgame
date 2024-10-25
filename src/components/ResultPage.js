import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultPage.css';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 }; // default to avoid errors

  const handleRestart = () => {
    navigate('/game'); // Navigates back to the game to start over
  };

  const handleHome = () => {
    navigate('/'); // Navigates to the home page
  };

  return (
    <div className="result-page">
      <video className="background-video" autoPlay loop muted>
        <source src="home.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1>Well Done Pookie!</h1>
        <p>Your Score: {score} / {total}</p>
        <div className="result-buttons">
          <button className="restart-button" onClick={handleRestart}>Restart Quiz</button>
          <button className="restart-button" onClick={handleHome}>Go to Home</button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
