import React from 'react';

import DefaultButton from '../button/Button.component';

import { useHistory } from 'react-router-dom';

// import './ExploreQuiz.style.scss';

const ExploreQuiz = () => {

  const history = useHistory();
  const moveToQuiz = () => {
    history.push("/challenges-rule");
    window.scrollTo(0, 0);
  }

  return (
    <div className="explore-quiz-section">
      <p>
        Explore our platform and test your recycling knowledge: Take the quiz now!
      </p>
      <DefaultButton
        click={moveToQuiz}
        text="Start Quiz"
      />
    </div>
  );
}

export default ExploreQuiz;