import { combineReducers } from "redux";

import isLoadingReducer from "./isLoadingReducer";
import errorReducer from "./errorReducer";
import { EntityReducer } from "./EntityReducer";
import { FilterReducer } from "./FilterReducer";

const rootReducer = combineReducers({
  collection: EntityReducer,
  filter : FilterReducer,
  isLoading: isLoadingReducer,
  error: errorReducer,

});


export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;