import { combineReducers } from "redux";

import isLoadingReducer from "./isLoadingReducer";
import errorReducer from "./errorReducer";
import { EntityTableReducer } from "./TableFenix";

const rootReducer = combineReducers({
  collection: EntityTableReducer,
  isLoading: isLoadingReducer,
  error: errorReducer,

});


export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;