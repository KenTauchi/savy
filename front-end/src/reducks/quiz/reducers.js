import * as Actions from "./action";
import { initialState } from "../store/initialState";

export const QuizDataReducer = (state = initialState.quizData, action) => {
  switch (action.type) {
    case Actions.QUIZ_IMPORT:
      console.log(action.payload[state.currentIndex - 1]);
      return {
        ...state,
        data: action.payload,
        quizLength: action.payload.length,
      };
    case Actions.INC:
      return {
        ...state,
        currentIndex: state.currentIndex + action.payload,
      };
    case Actions.INC_SCORE:
      return {
        ...state,
        correctAnswer: state.correctAnswer + action.payload,
      };
    case Actions.DIS_WINDOW:
      return {
        ...state,
        windowDis: action.payload,
      };
    case Actions.CORRECTNESS:
      return {
        ...state,
        correctness: action.payload,
      };
    case Actions.RESET_QUIZ:
      return {
        ...state,
        currentIndex: 1,
        showScore: false,
        correctAnswer: 0,
        windowDis: false,
        correctness: false,
      };

    default:
      return state;
  }
};
