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
		<div className="answer">
			{/* <input
        
      /> */}
			<div id={props.answerID}
				// type="radio"
				// name="quizAnswer"
				onClick={() => {
					dispatch(disWindow(true));
					if (props.correct === "yes") {
						dispatch(incScoreAction(1));
						dispatch(checkCorrect(true));
					} else {
						dispatch(checkCorrect(false));
					}
				}}>{props.charCode} <label >{props.answer}</label></div>

		</div>
	);
}
