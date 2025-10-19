import React, { useState, useEffect, useRef } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const decrementTimer = () => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          onAnswered(false);
          return 0;
        }
        timeoutRef.current = setTimeout(decrementTimer, 1000);
        return prev - 1;
      });
    };
    timeoutRef.current = setTimeout(decrementTimer, 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [onAnswered]);

  function handleAnswer(isCorrect) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
