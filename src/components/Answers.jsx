import { useRef } from "react"

export default function Answers({ answers, selectedAnswer, answerClass, handleSelectAnswer }) {

    // this ref will only change when key of Answers component is changed
    const shuffledAnswers = useRef(); //to store a value that doesnt go away on rerender
    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers]
        shuffledAnswers.current.sort(() => Math.random() - 0.5)
    }
    return (
        <ul id="answers">
            {shuffledAnswers.current.map(answer => {
                const isThisAnswerSelected = answer === selectedAnswer
                return (
                    <li key={answer} className="answer">
                        <button onClick={() => handleSelectAnswer(answer)}
                            className={isThisAnswerSelected ? answerClass : null}
                            disabled={answerClass !== ''}
                        >
                            {answer}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}