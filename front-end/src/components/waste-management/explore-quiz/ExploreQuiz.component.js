import React from 'react';

import { useHistory } from 'react-router-dom';

import './ExploreQuiz.style.scss';

const ExploreQuiz = () => {

  const history = useHistory();

  return (
    <div className="explore-quiz-section">
      <p>
        EXPLORE OUR PLATFORM AND TEST YOUR RECYCLING KNOWLEDGE: TAKE OUR QUIZ!
      </p>
      <button onClick={() => history.push("/quiz")}>Start Quiz</button>
    </div>
  );
}

export default ExploreQuiz;