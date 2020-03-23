import * as React from "react";
import { SearchType } from "tf-search-model";
interface IProps {
    SearchTypeSelect: (searchType: SearchType) => void;
    searchTypes: SearchType[];
    defaultValue: SearchType;
}
export default class SelectFilter extends React.Component<IProps> {
    render(): JSX.Element;
    private SelectTypeSearch;
}
export {};
