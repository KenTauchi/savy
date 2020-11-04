import React from "react";
import {
  incScoreAction,
  disWindow,
  checkCorrect,
} from "../../reducks/quiz/action";
import { useDispatch, useSelector } from "react-redux";

export default function Answer(props) {
  const dispatch = useDispatch();
  return (
    <div>
      <input
        id={props.answerID}
        type="radio"
        name="quizAnswer"
        onClick={() => {
          dispatch(disWindow(true));
          if (props.correct === "yes") {
            dispatch(incScoreAction(1));
            dispatch(checkCorrect(true));
          } else {
            dispatch(checkCorrect(false));
          }
        }}
      />
      <label htmlFor={props.answerID}>{props.answer}</label>
    </div>
  );
}
