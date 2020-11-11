import React from "react";
import { Link } from "react-router-dom";

export default function QuizStarter() {
	return (
		<div className="quiz-starter-page main-content">
			<div className="quiz-rules-section">
				<div className="quiz-starter-image">
					<img src="../images/contact.svg" alt="quiz-starter-img" />
				</div>
				<div className="quiz-starter-desc">
					<h2>Keep Calm and Challenge On</h2>
					<p>
						Dive in and dare yourself to test the knowledge about recycling. How
						it works?
	        		</p>
					<p>1. Click take quiz to began the challenge.</p>
					<p>2. Select the correct answer to earn the score.</p>
					<p>3. Submit the quiz to get the final score.</p>
					<Link to="/challenges" className="button savy-green-button take-quiz-btn">
						Take the Quiz
	      			</Link>
				</div>
			</div>
		</div>
	);
}
