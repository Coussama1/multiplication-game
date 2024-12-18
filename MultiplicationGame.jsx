import React, { useState, useEffect } from 'react';
import './styles.css';

const generateQuestion = () => {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  return { x, y };
};

const MultiplicationGame = () => {
  const [question, setQuestion] = useState(generateQuestion());
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        setGameOver(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const correctAnswer = question.x * question.y;

    if (parseInt(answer) === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
      setQuestion(generateQuestion());
      setAnswer('');
    } else {
      setAnswer(''); 
    }
  };

  const restartGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setQuestion(generateQuestion());
    setAnswer('');
  };

  return (
    <div className="container">
      <h1>Multiplication Game 🎮</h1>
      {gameOver ? (
        <div>
          <h2>Game Over! 🎉</h2>
          <p>Your Score: {score}</p>
          <button onClick={restartGame}>Play Again</button>
        </div>
      ) : (
        <>
          <h2>Score: {score}</h2>
          <h2>Time Left: {timeLeft}s</h2>
          <div>
            <h2>Question:</h2>
            <p>
              What is {question.x} × {question.y}?
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer"
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default MultiplicationGame;
