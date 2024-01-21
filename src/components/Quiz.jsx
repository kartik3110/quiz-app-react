/* Don’t call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the
top level of your React function. By following this rule, you ensure that Hooks are called in the
same order each time a component renders */

import { useState, useCallback } from "react"
import QUESTIONS from "../questions.js"
import completedImage from '../assets/quiz-complete.png'
import Question from "./Question.jsx"
import Summary from "./Summary.jsx"
export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([])
    const currentQuestionIndex = userAnswers.length

    const handleAnswerSelect = (selectedAnswer) => {
        setUserAnswers(prevState => [...prevState, selectedAnswer])

    }

    const onTimeOut = useCallback(() => {
        setUserAnswers(prevState => [...prevState, null])
    }, [])


    const onSkipAnswer = useCallback(onTimeOut, [onTimeOut])

    console.log(QUESTIONS.length)
    const isQuizComplete = currentQuestionIndex === QUESTIONS.length
    if (isQuizComplete) {
        return (
            <Summary userAnswers={userAnswers} />
        )
    }


    //FISHER-YATES (OR KNUTH) SHUFFLE ALGORITHM
    /* function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            // Generate a random index from 0 to i
            const j = Math.floor(Math.random() * (i + 1));
    
            // Swap elements at indices i and j
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    } */

    return (
        <div id="quiz">
            <Question
                key={currentQuestionIndex}
                index={currentQuestionIndex}
                onSkipAnswer={onSkipAnswer}
                handleAnswerSelect={handleAnswerSelect}
            // questionText={QUESTIONS[currentQuestionIndex].text}
            // answerState={answerState}
            // answers={QUESTIONS[currentQuestionIndex].answers}
            />
        </div>
    )
}