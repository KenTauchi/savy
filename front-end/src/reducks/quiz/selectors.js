import { createSelector } from "reselect";

const quizDataSelector = (state) => state.quiz;
export const getQuizData = createSelector([quizDataSelector], (state) => state);
