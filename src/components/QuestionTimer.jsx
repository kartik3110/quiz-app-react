import { useEffect, useState } from "react";

export default function QuestionTimer({ timeOut, onTimeOut }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('timer finished');
            onTimeOut();
        }, timeOut);

        //so that if the quiz is finished(thats when the component is removed) before a timer expires, it is cleaned up
        return () => {
            console.log('timer dismounted')
            clearTimeout(timer)
        }
    }, [timeOut, onTimeOut])
    const [remainingTime, setRemainingTime] = useState(timeOut)

    useEffect(() => {
        console.log('interval was set')
        const interval = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 100)
        }, 100);

        // so that when strict mode renders for the 2nd time, first timer is removed
        return () => {
            clearInterval(interval)
        }
    }, [onTimeOut]) // doesnt work as this does only runs the sideeffect, instead of resetting the timer


    return (
        <progress id="question-time" max={timeOut} value={remainingTime} />
    )
}
