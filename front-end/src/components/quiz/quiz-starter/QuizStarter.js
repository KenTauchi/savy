import React from "react";
import { Link } from "react-router-dom";

export default function QuizStarter() {
	return (
		<div className="quiz-starter-page main-content">
			<h1>Quiz</h1>
			<div className="quiz-starter-image">
				<img src="#" alt="quiz-starter-img" />
			</div>
			<h2>Keep Calm and Challenge On</h2>
			<div className="quiz-starter-desc">
				<p>
					Dive in and dare yourself to test the knowledge about recycling. How
					it works?
        		</p>
				<p>1.Click take quiz to began the challenge.</p>
				<p>2. Select the correct answer to earn the score.</p>
				<p>3.Submit the quiz to get the final score.</p>
			</div>
			<Link to="/challenges" className="button">
				Take the Quiz
      		</Link>
		</div>
	);
}
