import React from "react";
import { useHistory } from "react-router-dom";

const Explore = () => {
  const history = useHistory();

  return (
    <div className="explore-section">
      <p>
        To know more about these materials and learn how to improve your waste
        management, check our explore <span className="noWrap">page !</span>
      </p>

      <button onClick={() => history.push("/explore")} className="button savy-green-button contact-us-btn">Explore</button>

    </div>
  );
};

export default Explore;
