import React, { useState,useEffect } from "react";
import styles from './quizapp.module.css'
import { questions } from "../Atoms/questionlist";
export function  QuizApplication(){
  // Properties
  const [showResults, setShowResults] = useState(false);   //showresults=false
  const [currentQuestion, setCurrentQuestion] = useState(0); //currentquestion=0
  const [score, setScore] = useState(0);  //score=0
  const [timeLeft,setTimeLeft]=useState(100)

  // Helper Functions

  /* A possible answer was clicked */
  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
    
  };

  //timer function
  useEffect(() => {
    setInterval(()=> {
        setTimeLeft(prevTime => prevTime - 1)
    },1000)
},[])

useEffect(() => {
    if(timeLeft === 0) {
        //write the code to stop the timer .
        setShowResults(true)
        // submit the quiz 
    }
} ,[timeLeft])

function getRedableTimeFormat () {
    const minutes = Math.floor(timeLeft/60)
    const seconds = timeLeft%60
    return `${minutes} : ${seconds}`
}

  

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  
  return (
    <div className={styles.parent}>
      {/* 1. Header  */}
      
      <h1>Quiz App</h1>

      {/* 2. Current Score  */}
      {/* <h2>Score: {score}</h2> */}

      {/* 3. Show results or show the question game  */}
      {showResults ? (
       
       /* 4. Final Results */
        <div className={styles.results}>
          <h1>Final Results</h1>
          <h2>
            {score} out of {questions.length} correct - (
            {(score / questions.length) * 100}%)
          </h2>
          <button onClick={() => restartGame()}>Restart game</button>
          
        </div>
      ) : (
       
        /* 5. Question Card  */
        <div className={styles.card}>
          <p>Time Left: {getRedableTimeFormat()}</p>
         
          {/* Current Question  */}
          <h2>
            Question: {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className={styles.text}>{questions[currentQuestion].text}</h3>

          {/* List of possible answers  */}
          <ul>
            {questions[currentQuestion].options.map((option) => {  //questions[0].options.map
              return (
                <li
                  key={option.id}
                  onClick={() => optionClicked(option.isCorrect) }
                >
                  {option.text}
                </li>
              );
            })}
            
          </ul>
          
        
        </div>
      )}
      
    </div>
  );
}