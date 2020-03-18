import * as React from "react";
import ISearchFilterBaseProps from "./props/ISearchFilterBaseProps";
import ISearchFilterBaseState from "./state/ISearchFilterBaseState";
export default class SearchBase extends React.Component<ISearchFilterBaseProps, ISearchFilterBaseState> {
    private searchRef;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillMount(): void;
    private handleResultSelect;
    private handleSearchChange;
    private handleSearchChangeCategory;
    private resetComponent;
}
