import { GET_TABLE_FAILURE } from ".";
export default interface ITableReduxFailure {
  type: typeof GET_TABLE_FAILURE;
  error: string;
}
