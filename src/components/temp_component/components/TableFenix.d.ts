/// <reference types="react" />
import { IResult } from "tf-search-model";
export interface ITableFenixProps {
    elements?: IResult;
    loading: boolean;
}
export default function TableFenix(props: ITableFenixProps): JSX.Element;
