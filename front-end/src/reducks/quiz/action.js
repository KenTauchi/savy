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
