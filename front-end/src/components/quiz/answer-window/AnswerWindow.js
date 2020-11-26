import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { incAction, disWindow, resetQuiz } from "../../../reducks/quiz/action";
import { getQuizData } from "../../../reducks/quiz/selectors";

export default function AnswerWindow() {
	const dispatch = useDispatch();
	const selector = useSelector((state) => state);
	const quizData = getQuizData(selector);

	return quizData.currentIndex > quizData.quizLength ? (
		<div className="answer-window quiz-result-window">

			<div className="final-result-content">
				<div className="quiz-result-image">
					<img
						src={
							(quizData.correctAnswer / quizData.quizLength) * 100 > 40
								? "./images/icons/quiz-success.svg"
								: "./images/icons/quiz-fail.svg"
						}
					/>
				</div>

				<div className="quiz-reult-content">
					<p className="result-greeting">
						{(quizData.correctAnswer / quizData.quizLength).toFixed(2) * 100 <= 40
							? "Sorry! "
							: (quizData.correctAnswer / quizData.quizLength).toFixed(2) * 100 <=
								70 &&
								(quizData.correctAnswer / quizData.quizLength).toFixed(2) * 100 > 40
								? "Great! "
								: "Congratulations! "}
					</p>
					<p className="you-scored">
						You scored
					</p>
					<p className="quiz-final-score">
						{(quizData.correctAnswer / quizData.quizLength).toFixed(2) * 100}%
					</p>
					<p className="more-about">
						Learn more about recycling
					</p>
					<Link to="/explore" className="explore-more">EXPLORE</Link>

					<a
						className="savy-green-button back-btn"
						onClick={() => {
							dispatch(resetQuiz(true));
						}}
					>
						Back
		      		</a>
				</div>
			</div>
		</div>
	) : (
			<div className="answer-window">
				<div className="answer-content">
					<span className="answer-boolean">
						{quizData.correctness ? "Correct" : "Incorrect"} Answer
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
					<b>Let's Learn More</b>
					<p className="learn_more">{quizData.data[quizData.currentIndex - 1].question.description}</p>
	
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
			</div>
		);
}
