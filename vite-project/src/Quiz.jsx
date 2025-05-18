import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import quizBg from './assets/Quiz/quiz3.jpg';
import achieve from './assets/Quiz/achieve.gif';
import quizData from './assets/Quiz/quiz.json';

export const Quiz = () => {
  const [username, setUsername] = useState('');
  const [curQues, setCurQues] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [showScore, setShowScore] = useState(false);
  const [status, setStatus] = useState('');
  const [homePage, setHomePage] = useState(true);
  const [error, setError] = useState('');

  const checkAnswer = (selected) => {
    if (selected === quizData[curQues].answer) {
      setScore((prev) => prev + 1);
    }

    if (curQues < quizData.length - 1) {
      setCurQues((prev) => prev + 1);
      setTimer(30);
    } else {
      setShowScore(true);
    }
  };

  useEffect(() => {
    switch (score) {
      case 3:
        setStatus('🏆 Excellent!');
        break;
      case 2:
        setStatus('👍 Good Try!');
        break;
      case 1:
        setStatus('Keep Practicing!');
        break;
      default:
        setStatus('Don’t Give Up!');
        break;
    }
  }, [score]);

  useEffect(() => {
    let interval;
    if (timer > 0 && !showScore && !homePage) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setShowScore(true);
    }
    return () => clearInterval(interval);
  }, [timer, showScore, homePage]);

  const handleStartQuiz = () => {
    if (username.trim().length < 3) {
      setError('Name must be at least 3 characters!');
      return;
    }
    setError('');
    setHomePage(false);
  };

  const restartQuiz = () => {
    setShowScore(false);
    setCurQues(0);
    setScore(0);
    setTimer(30);
  };

  const goHome = () => {
    setHomePage(true);
    setShowScore(false);
    setScore(0);
    setCurQues(0);
    setUsername('');
    setTimer(30);
    setError('');
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url(${quizBg})` }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="z-10 max-w-3xl w-full bg-white/10 text-white p-8 rounded-2xl backdrop-blur-lg border border-white/10 shadow-xl space-y-6"
      >
        {homePage ? (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-gradient bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text uppercase">Welcome to the Quiz App</h2>
            <input
              type="text"
              placeholder="Enter your name..."
              className="w-3/4 px-4 py-2 rounded bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-purple-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {error && <p className="text-red-400">{error}</p>}
            <button
              className="mt-2 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition"
              onClick={handleStartQuiz}
            >
              Start Quiz
            </button>

            <div className="text-left mt-6">
              <h3 className="text-lg font-semibold text-orange-400">Quiz Rules:</h3>
              <ul className="list-disc ml-6 text-sm text-gray-200 space-y-1">
                <li>Enter your name</li>
                <li>Choose an answer before time ends</li>
                <li>Don't refresh the page</li>
                <li>Each question is timed (30s)</li>
              </ul>
            </div>

            <div className='bg-gradient-to-r from-blue-500 to-pink-600 bg-clip-text text-transparent font-semibold hover:opacity-90 transition'>Developed By &copy; Saktrix {new Date().getFullYear()}</div>
          </div>
        ) : showScore ? (
          <div className="flex flex-col items-center text-center space-y-4">
            <img src={achieve} alt="Congrats" className="w-44 h-44 object-contain" />
            <h2 className="text-xl font-semibold">🎉 Congrats, {username}!</h2>
            <p className="text-lg">Your Score: <span className="font-bold text-pink-400">{score}/{quizData.length}</span></p>
            <p>Status: <span className="text-blue-400">{status}</span></p>
            <div className="flex gap-4 mt-4">
              <button onClick={restartQuiz} className="px-4 py-2 bg-orange-500 rounded hover:bg-orange-400">Restart</button>
              <button onClick={goHome} className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-500">Home</button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <h2 className="text-xl text-pink-400">Hi {username}, Let's begin!</h2>
            <h3 className="text-lg">Q{curQues + 1}: {quizData[curQues].question}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {quizData[curQues].option.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => checkAnswer(opt)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full hover:opacity-90 transition text-white"
                >
                  {opt}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-300">Time Remaining: <span className="font-bold">{timer}s</span></p>
          </div>
        )}
      </motion.div>
    </section>
  );
};
