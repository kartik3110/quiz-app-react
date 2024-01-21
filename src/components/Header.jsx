import myImage from '../assets/quiz-logo.png'
export default function Header () {
    return (
        <header>
            <h1>Quiz</h1>
            <img src={myImage} alt="" />
        </header>
    )
}