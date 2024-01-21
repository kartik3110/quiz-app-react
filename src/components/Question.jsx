import { useState } from "react"
import Answers from "./Answers"
import QuestionTimer from "./QuestionTimer"
import QUESTIONS from '../questions'

export default function Question({ index, onSkipAnswer, handleAnswerSelect }) {
    const [answerState, setAnswerState] = useState({
        selectedAnswer: '',
        isCorrect: null
    })

    let timerValue = 10000;

    if (answerState.selectedAnswer) {
        timerValue = 1000;
    }

    if (answerState.isCorrect !== null) {
        timerValue = 2000;
    }


    const handleSelectAnswer = (ans) => {
        setAnswerState({
            selectedAnswer: ans,
            isCorrect: null
        });

        setTimeout(() => {
            if (ans === QUESTIONS[index].answers[0])
                setAnswerState({
                    selectedAnswer: ans,
                    isCorrect: true
                });
            else
                setAnswerState({
                    selectedAnswer: ans,
                    isCorrect: false
                });

            setTimeout(() => {
                handleAnswerSelect(ans);
            }, 2000);

        }, 1000);
    }

    let answerClass = ''
    if (answerState.selectedAnswer && answerState.isCorrect !== null) {
        answerClass = answerState.isCorrect ? 'correct' : 'wrong';
    }
    else if (answerState.selectedAnswer) {
        answerClass = 'selected';
    }


    return (
        <div id="question">

            {/* when next question comes, QuestionTimer component is not re-executed by react as it has not changed. thats why the timer and interval dont reset. */}
            {/* but if we add a key and change it on every new question, react will 'UNMOUNT AND REMOUNT' the QuestionTimer component (even causing ref values to change)*/}
            <QuestionTimer
                key={timerValue}//so when timer changes, old timers and intervals are destroyed
                timeOut={timerValue}
                onTimeOut={answerState.selectedAnswer === '' ? onSkipAnswer : null}
            // onTimeOut={useCallback(onTimeOut, [onTimeOut])} // dont use hooks here as it wont be invoked if this div doesnt render, and will throw an error
            />

            <h2>{QUESTIONS[index].text}</h2>

            <Answers
                answers={QUESTIONS[index].answers}
                selectedAnswer={answerState.selectedAnswer}
                answerClass={answerClass}
                handleSelectAnswer={handleSelectAnswer}
            />

        </div>
    )
}
