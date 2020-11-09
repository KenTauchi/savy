import React from "react";
import { useHistory } from "react-router-dom";

import DefaultButton from '../button/Button.component';

// import './RecyclingFacts.style.scss';

const Explore = () => {
  const history = useHistory();

  const moveToExplore = () => {
      history.push("/explore");
  }

  return (
    <div className="explore-section">
      <p>
        To know more about these materials and learn how to improve your waste
        management, check our explore page !
      </p>

      <DefaultButton 
        click={moveToExplore}
        text="Explore"
        />
    </div>
  );
};

export default Explore;
