import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import questions from '../questions.json'; // Importing questions.json directly
import './GameBoard.css';

function GameBoard() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(10); // 10 seconds for each question
  const [feedback, setFeedback] = useState(''); // State for feedback message
  const [celebrate, setCelebrate] = useState(false); // State for celebration
  const [sadFace, setSadFace] = useState(false); // State for sad face
  const navigate = useNavigate();

  // Handle option click
  const handleOptionClick = (option) => {
    if (selectedOption === null) { // Allow selection only if no option is selected
      setSelectedOption(option);
      const currentQuestion = questions[currentQuestionIndex];

      if (option === currentQuestion.answer) {
        setFeedback('Yoohoo! Correct!'); // Set feedback for correct answer
        setCelebrate(true); // Trigger celebration
        setScore((prevScore) => prevScore + 1); // Increment score
        setSadFace(false); // Ensure sad face is off for correct answers
      } else {
        setFeedback(`Oops! The correct answer is: ${currentQuestion.answer}`); // Feedback for wrong answer
        setSadFace(true); // Trigger sad face for wrong answer
        setCelebrate(false); // Ensure celebration is off for wrong answers
      }
    }
  };

  // Define handleNextQuestion as a regular function first
  const handleNextQuestion = useCallback(() => {
    const nextQuestionIndex = currentQuestionIndex + 1;

    // Wait for 2 seconds before moving to the next question
    setTimeout(() => {
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setSelectedOption(null); // Reset selection
        setFeedback(''); // Clear feedback
        setTimer(10); // Reset timer for the next question
        setCelebrate(false); // Reset celebration state
        setSadFace(false); // Reset sad face state
      } else {
        // Navigate to the results page after showing the feedback
        navigate('/result', { state: { score, total: questions.length } });
      }
    }, 2000);
  }, [currentQuestionIndex, score, navigate]);

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      handleNextQuestion(); // When time's up, go to the next question
    }
  }, [timer, handleNextQuestion]); // Dependencies: timer and handleNextQuestion

  return (
    <div className="game-board">
      <video className="background-video" autoPlay loop muted>
        <source src="/gameboard.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay">
        <h2>{questions[currentQuestionIndex].question}</h2>
        <div className="timer">
          Time left: {timer} seconds
        </div>
        <div className="options">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`option-button ${selectedOption === option ? 
                option === questions[currentQuestionIndex].answer ? "correct" : "wrong" : ""}`}
              disabled={selectedOption !== null}
            >
              {option}
            </button>
          ))}
        </div>
        {feedback && <p className="feedback">{feedback}</p>}
        {celebrate && <div className="celebration">🎉</div>}
        {sadFace && <div className="sad-face">😢</div>}
        <button onClick={handleNextQuestion} disabled={selectedOption === null}>Next</button>
      </div>
    </div>
  );
}

export default GameBoard;
