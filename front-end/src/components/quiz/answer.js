import React, { Component } from "react";
import { incAction, incScoreAction } from "../../reducks/quiz/action";
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
          if (props.correct === "yes") {
            dispatch(incScoreAction(1));
          }
          dispatch(incAction(1));
        }}
      />
      <label htmlFor={props.answerID}>{props.answer}</label>
    </div>
  );
}
