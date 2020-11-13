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
			<div id={props.answerID}
				onClick={() => {
					dispatch(disWindow(true));
					if (props.correct === "yes") {
						dispatch(incScoreAction(1));
						dispatch(checkCorrect(true));
					} else {
						dispatch(checkCorrect(false));
					}
				}}><span className="answer-option">{props.charCode}</span> <label >{props.answer}</label></div>

		</div>
	);
}
