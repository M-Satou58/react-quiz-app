import { useState, useEffect } from 'react'
import './App.css';
import Question from './Components/Question'
import Answer from './Components/Answer'
import Modal from './Components/Modal'
import Confetti from 'react-confetti'
function App() {
  const [data, setData] = useState([])
  const [question, setQuestion] = useState("")
  const [questionCounter, setQuestionCounter] = useState(1)
  const [questionAnswers, setQuestionAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)

  let width = window.innerWidth
  let height = window.innerHeight

  async function updateQuestion() {
    try{
      const response = await fetch("https://the-trivia-api.com/api/questions?categories=science&limit=1&difficulty=easy")
      const questions = await response.json()
      questions.forEach(q => {
        setData([q])
      })
    }
    catch (error){
      console.log('Something went wrongj')
    }
  }

  useEffect(() => {
    updateQuestion()
  }, [])

  useEffect(() => {

    if (data.length > 0){
      setQuestion(data[0].question)

      let wrongAnswers = data[0]['incorrectAnswers']
      let correctAnswer = data[0]['correctAnswer']
      let answers = [...wrongAnswers, correctAnswer]

      let currentIndex = answers.length,  randomIndex;
      while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [answers[currentIndex], answers[randomIndex]] = [
      answers[randomIndex], answers[currentIndex]];
    
      setQuestionAnswers(answers)
      }
    }
  }, [data])

  const checkAnswer = () => {
    if(selectedAnswer !== "") {

    let correctAnswer = data[0]['correctAnswer']
    if(correctAnswer === selectedAnswer){
      setScore(prev => prev + 1)
      setQuestionCounter(prev => prev + 1)
      setSelectedAnswer("")

      updateQuestion() 
    }
    else{
      setQuestionCounter(prev => prev + 1)
      setSelectedAnswer("")

      updateQuestion() 
    }
    }else{
      alert('Please choose a answer first')
    }
    
  }


  const nextQuestion = () => {
    checkAnswer()
  }
  
  const playAgain = () => {
    setSelectedAnswer("")
    setQuestionCounter(0)
    setScore(0)
    updateQuestion()
  }


  return (
    <div className="container">
      {questionCounter > 10 && <Confetti width={width} height={height} />}
      {questionCounter <= 10 && 
      <div className="container-body">
        <Question question={question}/>
       <div className="answer-container">
        {questionAnswers.map(q => {
          return <Answer key={q} answer={q} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer}/>
        })}
      </div>
      <button onClick={nextQuestion} className="btn-next">Next</button>
      <h6 className="question-counter">{questionCounter}/10</h6>
    </div>
      }

      {questionCounter > 10 && <Modal score={score} playAgain={playAgain} />}

      
    </div>
  );
}
export default App;
