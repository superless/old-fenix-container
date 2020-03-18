/// <reference types="react" />
import { IResult } from "tf-search-model";
export interface ITableFenixProps {
    elements?: IResult;
    loading: boolean;
    headerRelated: (header: number) => string;
    headerProperty: (header: number) => string;
}
export default function TableFenix(props: ITableFenixProps): JSX.Element;
