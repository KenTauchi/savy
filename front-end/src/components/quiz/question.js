import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { initialState } from "../../reducks/store/initialState";
import { quizImportAction, incAction } from "../../reducks/quiz/action";
import { getQuizData } from "../../reducks/quiz/selectors";
import Answer from "./answer";
import ProgressBar from "./progress-bar/Progressbar";

import { API_URL } from "../global_variables";

export default function Question() {
  let charCode = 65;
  const selector = useSelector((state) => state);
  const quizData = getQuizData(selector);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("quiz API data fetch rendered");

    fetch(`${API_URL}/quiz?limit=10`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        dispatch(quizImportAction(result));
      })
      .catch(() => null);
  }, []);
  const [display, setDisplay] = useState("block");
  return (
    <div
      className="question-answer-section"
      style={{
        display: quizData.currentIndex > quizData.quizLength ? "none" : "block",
      }}
    >
      {quizData.currentIndex > quizData.quizLength ? (
        <div></div>
      ) : (
        <div>
          <h3 className="question-number">
            Question {quizData.currentIndex} / {quizData.quizLength}
          </h3>

          <ProgressBar />

          <div className="question-answer-block">
            <h4 className="question-text">
              {typeof quizData.data[0] === "undefined"
                ? "Loading..."
                : quizData.data[quizData.currentIndex - 1].question.question}
            </h4>
            <div className="answer-list">
              {typeof quizData.data[0] === "undefined"
                ? "Loading..."
                : quizData.data[
                    quizData.currentIndex - 1
                  ].answers.map((answer, index) => (
                    <Answer
                      key={index}
                      answerID={`answer_${index}`}
                      answer={answer.answer}
                      correct={answer.correct}
                      charCode={String.fromCharCode(charCode++)}
                    />
                  ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
