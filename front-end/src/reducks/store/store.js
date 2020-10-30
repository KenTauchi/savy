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


import thunk from "redux-thunk";

export default function createStore(history) {

	return reduxCreateStore(
		combineReducers({
			router: connectRouter(history),
			dataSet: DataSetReducer,
			dataTable: DataTableReducer,
      testimonial: DataTestimonialReducer,
			faq: DataFaqReducer,
			team: TeamDataReducer
		}),

		applyMiddleware(routerMiddleware(history), thunk)
	);
}


