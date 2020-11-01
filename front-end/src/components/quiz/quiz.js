import React, { useEffect } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import Question from "../quiz/question";

// import { getQuizData } from "../../reducks/quiz/selectors";

const Quiz = () => {
  return (
    <div>
      <Header />
      <div className="content">
        <h1>Quiz</h1>
        <Question />
      </div>
      <Footer />
    </div>
  );
};

export default Quiz;
