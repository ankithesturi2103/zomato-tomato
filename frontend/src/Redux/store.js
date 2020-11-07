import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { landingPageReducer } from "../LandingPage/Redux/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({ landingPageReducer });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export { store };
