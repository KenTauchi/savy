export const returnQuiz = (quizSets, currentIndex) => {
  //   console.log("allQuizData," + JSON.stringify(quizSets));
  //   console.log("oneQuizData," + currentIndex);
  console.log("oneQuizData," + JSON.stringify(quizSets[currentIndex - 1]));
  return quizSets[currentIndex - 1];
};
