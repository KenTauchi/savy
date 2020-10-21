import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware,
  } from "redux";
  import { connectRouter, routerMiddleware } from "connected-react-router";
  import { DataSetReducer, DataTableReducer } from "../mapChartData/reducers";
  
  
  import thunk from "redux-thunk";
  
  
  
  export default function createStore(history) {
    return reduxCreateStore(
      combineReducers({
        router: connectRouter(history),
        dataSet: DataSetReducer,
        dataTable: DataTableReducer
       
      }),
      applyMiddleware(routerMiddleware(history), thunk)
    );
  }
  
  // Store is literally storing the state of this app.
  // The object inside the combineReduces is technically equal to the state.
  // each poperty/category is corresponding with the property name in the initial state.
  // combineReducers has a chunk of JSON.
  
  // set router state with the connectRouter passing the history parameter