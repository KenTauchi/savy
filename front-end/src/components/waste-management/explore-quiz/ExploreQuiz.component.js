import React from 'react';
import { useHistory } from 'react-router-dom';

const ExploreQuiz = () => {

  const history = useHistory();

  return (
    <div className="explore-quiz-section">
      <p>
        Explore our platform and test your recycling knowledge: Take the quiz now!
      </p>
      <button onClick={() => history.push("/challenges-rule")} className="button savy-green-button contact-us-btn">Start Quiz</button>
    </div>
  );
}

export default ExploreQuiz;