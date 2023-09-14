
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer/index";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
// thunk nos permite trabajar con asincronismo en el front

export default store;
