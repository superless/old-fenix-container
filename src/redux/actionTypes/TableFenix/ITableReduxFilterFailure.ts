import { GET_FILTER_TABLE_FAILURE } from ".";
export default interface ITableReduxFilterFailure {
  type: typeof GET_FILTER_TABLE_FAILURE;
  error: string;
}