const Answer = ({ answer, selectedAnswer ,setSelectedAnswer }) => {
  const clickHander = () => {
    setSelectedAnswer(answer)
  }
  return (
    <div className={`answer ${answer === selectedAnswer ? ' selected': ''}`} onClick={clickHander}>
      <h2>{answer}</h2>
    </div>
  )
}

export default Answer
