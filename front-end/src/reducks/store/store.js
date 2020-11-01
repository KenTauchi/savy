import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { DataSetReducer, DataTableReducer } from "../mapChartData/reducers";
import { DataFaqReducer } from "../exploreFAQ/reducers";
import { TeamDataReducer } from "../teamMembers/reducers";
import { DataTestimonialReducer } from "../testimonials/reducers";
import { QuizDataReducer } from "../quiz/reducers";

import thunk from "redux-thunk";

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      dataSet: DataSetReducer,
      testimonial: DataTestimonialReducer,
      faq: DataFaqReducer,
      team: TeamDataReducer,
      quiz: QuizDataReducer,
    }),

    applyMiddleware(routerMiddleware(history), thunk)
  );
}
