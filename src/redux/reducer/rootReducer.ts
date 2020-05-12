import { combineReducers } from "redux";

import isLoadingReducer from "./isLoadingReducer";
import errorReducer from "./errorReducer";
import { FilterReducer } from "./FilterReducer";
import { EntityTableReducer } from "./TableFenix";

const rootReducer = combineReducers({
  collection: EntityTableReducer,
  filter : FilterReducer,
  isLoading: isLoadingReducer,
  error: errorReducer,

});


export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;