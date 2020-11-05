export const QUIZ_IMPORT = "QUIZ_IMPORT";

export const quizImportAction = (dataResult) => {
  return {
    type: "QUIZ_IMPORT",
    payload: dataResult,
  };
};

export const INC = "INC";

export const incAction = (num) => {
  return {
    type: "INC",
    payload: num,
  };
};

export const INC_SCORE = "INC_SCORE";

export const incScoreAction = (num) => {
  return {
    type: "INC_SCORE",
    payload: num,
  };
};

export const DIS_WINDOW = "DIS_WINDOW";

export const disWindow = (boolean) => {
  return {
    type: "DIS_WINDOW",
    payload: boolean,
  };
};

export const CORRECTNESS = "CORRECTNESS";

export const checkCorrect = (boolean) => {
  return {
    type: "CORRECTNESS",
    payload: boolean,
  };
};

export const RESET_QUIZ = "RESET_QUIZ";

export const resetQuiz = (boolean) => {
  return {
    type: "RESET_QUIZ",
    payload: boolean,
  };
};
