import React from "react";

import { useSelector } from "react-redux";
import { getQuizData } from "../../reducks/quiz/selectors";

import Question from "../quiz/question";
import AnswerWindow from "./answer-window/AnswerWindow";

const Quiz = () => {
	const selector = useSelector((state) => state);
	const quizData = getQuizData(selector);

	return (
		<div className="main-content quiz-page">

			<div className="quiz-content">
				{quizData.windowDis ? <div className="quiz-overlay"></div> : null}
				<h1>Quiz</h1>
				<Question />
				{quizData.windowDis ? <AnswerWindow /> : null}
			</div>
		</div>
	);
};

export default Quiz;
