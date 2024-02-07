import "./AnswerTimer.scss";
import { useEffect, useState, useRef } from "react";

function AnswerTimer({duration, onTimeUp}) {
    const [counter, setCounter] = useState(0);
    const [progressLoaded, setProgressLoaded] = useState(0);
    const intervalRef = useRef();

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCounter((cur) => cur + 1);
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        setProgressLoaded(100 * (counter / 10));

        if (counter === duration) {
            clearInterval(intervalRef.current);

            setTimeout(() => {
                setCounter(0);
                onTimeUp();
            }, 1000);
        }
    }, [counter])

    return (
    <div className="answer-timer-container"
        style={{
            width: `${progressLoaded}%`,
            backgroundColor: `${
                progressLoaded < 40 
                ? 'lightgreen'
                : progressLoaded < 70
                ? 'orange'
                : 'red'
            }`
        }}
    >
        
        <div className="progress" >
        </div>
    
    </div>
    )
    
} 


export default AnswerTimer;