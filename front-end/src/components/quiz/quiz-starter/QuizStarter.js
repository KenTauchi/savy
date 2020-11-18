import React from "react";
import { Link } from "react-router-dom";

export default function QuizStarter() {
	return (
		<div className="quiz-starter-page main-content">
			<div className="quiz-rules-section">
				<div className="quiz-starter-image">
					<img src="./images/icons/quiz_starter.svg" alt="quiz-starter-img" />
				</div>
				<div className="quiz-starter-desc">
					<h2>Recycling Challenge</h2>
					<p>
						Test your knowledge and learn more about recycling now!
	        		</p>
					<p>Steps to take the quiz</p>
					<p>1. Click the button below to begin the challenge.</p>
					<p>2. Select the correct answer to increase your score.</p>
					<p>3. Get a final score on submission!</p>
					<p>Let’s get started!</p>
					<Link to="/challenges" className="button savy-green-button take-quiz-btn">
						Take the Quiz
	      			</Link>
				</div>
			</div>
		</div>
	);
}
