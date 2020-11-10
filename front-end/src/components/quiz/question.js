import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { initialState } from "../../reducks/store/initialState";
import { quizImportAction, incAction } from "../../reducks/quiz/action";
import { getQuizData } from "../../reducks/quiz/selectors";
import Answer from "./answer";
import ProgressBar from "./progress-bar/Progressbar";

export default function Question() {
  const selector = useSelector((state) => state);
  const quizData = getQuizData(selector);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("quiz API data fetch rendered");

    fetch("http://localhost:3000/api/v1/quiz?limit=10")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        dispatch(quizImportAction(result));
      })
      .catch(() => null);
  }, []);

  return (
    <div>
      <div>
        {quizData.currentIndex > quizData.quizLength ? (
          <div className="quiz-loading">Thank you!</div>
        ) : (
          <div>
            <ProgressBar />

            <h2>
              Question {quizData.currentIndex} / {quizData.quizLength}
            </h2>
            <h3>
              {typeof quizData.data[0] === "undefined"
                ? "Loading..."
                : quizData.data[quizData.currentIndex - 1].question.question}
            </h3>
            <div>
              {typeof quizData.data[0] === "undefined"
                ? "Loading..."
                : quizData.data[
                    quizData.currentIndex - 1
                  ].answers.map((answer, index) => (
                    <Answer
                      key={index}
                      answerID={`answer_${index}`}
                      answer={answer.answer}
                      correct={answer.correct}
                    />
                  ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
