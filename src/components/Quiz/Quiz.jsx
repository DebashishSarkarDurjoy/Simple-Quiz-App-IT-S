import { useState } from "react";
import { resultInitialState } from "../../constants";
import AnswerTimer from "../AnswerTimer/AnswerTimer";
import "./Quiz.scss";

const Quiz = ({jsQuizz}) => {
    let questions = jsQuizz["questions"];
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(resultInitialState);
    const [showResult, setShowResult] = useState(false);
    const [showAnswerTimer, setShowAnswersTimer] = useState(true);

    const {question, choices, correctAnswer} = questions[currentQuestion];


    const onAnswerClick = (answer, index) => {
        if (answer === correctAnswer) {
            setAnswer(true);
        }
        else {
            setAnswer(false);
        }
    }

    const onClickNext = (finalAnswer) => {
        setAnswerIdx(null);
        setShowAnswersTimer(false);
        setResult( (prev) => 
            finalAnswer 
                ? {
                    ...prev,
                    score: prev.score + 5,
                    correctAnswers: prev.correctAnswers + 1,
                }
                : {
                    ...prev,
                    wrongAnswers: prev.wrongAnswers + 1,
                }
        );

        if (currentQuestion !== questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setCurrentQuestion(1);
            setShowResult(true);
        }

        setTimeout(() => {
            setShowAnswersTimer(true);
        })
    }

    const onTryAgain = () => {
        setResult(resultInitialState);
        setShowResult(false);
    }

    const handleTimeUp = () => {
        setAnswer(false);
        onClickNext(false);
    }

    return (
        <div className="quiz-container">
            {!showResult ? (
            <>
            { showAnswerTimer && <AnswerTimer duration={10} onTimeUp={handleTimeUp} />}
            <h1>{showResult}</h1>
                <span className="active-question-no"> { currentQuestion + 1} </span>
                <span className="total-questions" > / { questions.length } </span>
                <h2>{ question }</h2>
                <ul>
                    {
                        choices.map((choice, index) => (
                            <li key={choice}
                                onClick={() => onAnswerClick(choice, index) || setAnswerIdx(index)}
                                className={ answerIdx === index ? "selected-answer" : null }
                            >
                                { choice }
                            </li>
                        ))
                    }
                </ul>
                <div className="footer">
                    <button 
                        onClick={() => onClickNext(answer)}
                        disabled={answerIdx === null}
                    >
                        { currentQuestion === questions.length-1 ? "Finish" : "Next" }
                    </button>
                </div>
           </>) : <div className="result">
            <h3>Result</h3>
            <p>
                Total Questions: <span>{questions.length}</span>
            </p>
            <p>
                Total Score: <span>{result.score}</span>
            </p>
            <p>
                Correct Answers : <span>{result.correctAnswers}</span>
            </p>
            <p>
                Wrong Answers: <span>{result.wrongAnswers}</span>
            </p>
            <button onClick={() => onTryAgain()}>Try Again</button>
           </div> }
           
           
        
        </div>
    );
}

export default Quiz;