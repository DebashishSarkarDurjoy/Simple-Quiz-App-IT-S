import { useEffect, useState } from "react";
import Quiz from "./components/Quiz/Quiz";
import { jsQuizz } from "./constants_test.js";

function App() {
  // const [questions, setQuestions] = useState(jsQuizz);

  // useEffect(() => {
  //   getQuestions();
  // }, []);



  // const getQuestions = async() => {
  //   try {
  //     //https://script.google.com/macros/s/AKfycbwbrvTXXqu2xVmSlXonHRGTMNMI6O-qZFvMWJEM6yJ_ehlga57kvAdI_0gi215M7-N8eQ/exec
  //     // const response = await fetch("http://127.0.0.1:5000/api/hello");
  //     // const questionsResponse = await response.json();
  //     // console.log(questionsResponse);
  //     // console.log(typeof(questionsResponse));

  //     // setQuestions();
  //     const questions = jsQuizz.questions;

  //     console.log(questions);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const questions = jsQuizz["questions"];
  return (questions.length && <Quiz jsQuizz={jsQuizz}/>) ;
}

export default App
