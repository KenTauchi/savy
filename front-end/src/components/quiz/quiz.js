import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { getQuizData } from "../../reducks/quiz/selectors";

import Header from "../header/header";
import Footer from "../footer/footer";
import Question from "../quiz/question";
import AnswerWindow from "./answer-window/AnswerWindow";

import "./quiz.scss";

const Quiz = () => {
  const selector = useSelector((state) => state);
  const quizData = getQuizData(selector);

  return (
    <div className="quiz-page">
      <Header />

      <div className="quiz-content">
        {quizData.windowDis ? <div className="quiz-overlay"></div> : null}
        <h1>Quiz</h1>
        <Question />
        {quizData.windowDis ? <AnswerWindow /> : null}
      </div>

      <Footer />
    </div>
  );
};

export default Quiz;
