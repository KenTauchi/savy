import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AnswerWindow.scss";

import { incAction, disWindow, resetQuiz } from "../../../reducks/quiz/action";
import { getQuizData } from "../../../reducks/quiz/selectors";

export default function AnswerWindow() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const quizData = getQuizData(selector);
  console.log(quizData);

  return (
    <div className="answer-window">
      {quizData.currentIndex > quizData.quizLength ? (
        <div>
          <h2>
            Congratulation! Your Score is
            {(quizData.correctAnswer / quizData.quizLength).toFixed(2) * 100}%
          </h2>
          <div>
            <img src="https://images.unsplash.com/photo-1563477710521-5ae0aa5085ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" />
          </div>
          <span
            className="next-question"
            onClick={() => {
              dispatch(resetQuiz(true));
            }}
          >
            Back
          </span>
        </div>
      ) : (
        <div>
          <h2>{quizData.correctness ? "Correct" : "Incorect"} Answer!!</h2>
          <div>
            <img src="#" />
          </div>
          <p>{quizData.data[quizData.currentIndex - 1].question.description}</p>

          {quizData.currentIndex === quizData.quizLength ? (
            <span
              className="next-question"
              onClick={() => {
                dispatch(incAction(1));
                dispatch(disWindow(true));
              }}
            >
              See Score
            </span>
          ) : (
            <span
              className="next-question"
              onClick={() => {
                dispatch(incAction(1));
                dispatch(disWindow(false));
              }}
            >
              Next Question
            </span>
          )}
        </div>
      )}
    </div>
  );
}
