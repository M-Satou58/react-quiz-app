const Modal = ({score, playAgain}) => {
  return (
      <div className="modal">
        <h1>You answered all 10 questions!</h1>
        <h2>Your score is <span>{score}/10</span></h2>
        <button onClick={playAgain}>Take the quiz again?</button>
      </div>
  )
}
export default Modal

