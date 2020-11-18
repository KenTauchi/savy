import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { incAction, disWindow, resetQuiz } from "../../../reducks/quiz/action";
import { getQuizData } from "../../../reducks/quiz/selectors";

export default function AnswerWindow() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const quizData = getQuizData(selector);

  return quizData.currentIndex > quizData.quizLength ? (
    <div className="answer-window">
      <h2>
        {(quizData.correctAnswer / quizData.quizLength).toFixed(2) * 100 <= 40
          ? "Sorry... "
          : (quizData.correctAnswer / quizData.quizLength).toFixed(2) * 100 <=
              70 &&
            (quizData.correctAnswer / quizData.quizLength).toFixed(2) * 100 > 40
          ? "Great! "
          : "Congratulations! "}
        Your Score is &nbsp;{" "}
        {(quizData.correctAnswer / quizData.quizLength).toFixed(2) * 100}%
      </h2>

      <div>
        <img
          src={
            (quizData.correctAnswer / quizData.quizLength) * 100 > 40
              ? "./images/icons/quiz-success.svg"
              : "./images/icons/quiz-fail.svg"
          }
        />
      </div>
      <span
        className="next-question savy-green-button"
        onClick={() => {
          dispatch(resetQuiz(true));
        }}
      >
        Back
      </span>
    </div>
  ) : (
    <div className="answer-window">
      <span className="answer-boolean">
        {quizData.correctness ? "Correct" : "Incorect"} Answer
      </span>
      <div className="true-false-logo">
        <img
          src={
            quizData.correctness
              ? "./images/icons/right_answer.svg"
              : "./images/icons/wrong_answer.svg"
          }
        />
      </div>
      {quizData.correctness ? "" : <b>Let's Learn More</b>}
      <p>{quizData.data[quizData.currentIndex - 1].question.description}</p>

      {quizData.currentIndex === quizData.quizLength ? (
        <span
          className="next-question savy-green-button"
          onClick={() => {
            dispatch(incAction(1));
            dispatch(disWindow(true));
          }}
        >
          See Score
        </span>
      ) : (
        <span
          className="next-question savy-green-button"
          onClick={() => {
            dispatch(incAction(1));
            dispatch(disWindow(false));
          }}
        >
          Next Question
        </span>
      )}
    </div>
  );
}
