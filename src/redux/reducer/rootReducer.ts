import { combineReducers } from "redux";

import isLoadingReducer from "./isLoadingReducer";
import errorReducer from "./errorReducer";
import { EntityReducer } from "./EntityReducer";

const rootReducer = combineReducers({
  entities: EntityReducer,
  isLoading: isLoadingReducer,
  error: errorReducer
});


export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;