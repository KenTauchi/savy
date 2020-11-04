import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AnswerWindow.scss";

import { incAction, disWindow } from "../../../reducks/quiz/action";
import { getQuizData } from "../../../reducks/quiz/selectors";

export default function AnswerWindow() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const quizData = getQuizData(selector);

  return (
    <div className="answer-window">
      <h2>{quizData.correctness ? "Correct" : "Incorect"} Answer!!</h2>
      <div>
        <img src="#" />
      </div>
      <p>{quizData.data[quizData.currentIndex - 1].question.description}</p>
      <span
        className="next-question"
        onClick={() => {
          dispatch(incAction(1));
          dispatch(disWindow(false));
        }}
      >
        Next Question
      </span>
    </div>
  );
}
