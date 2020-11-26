import React from "react";
import { useHistory } from "react-router-dom";

export default function QuizStarter() {
	const history = useHistory();
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
					<ol className="quiz-rules">
						<li>Click the button below to begin the challenge.</li>
						<li>Select the correct answer to increase your score.</li>
						<li>Get a final score on submission!</li>
					</ol>

					<p>Let’s get started!</p>
					<button onClick={() => history.push("/challenges")} className="button savy-green-button take-quiz-btn">
						Take the Quiz
	      			</button>
				</div>
			</div>
		</div>
	);
}
