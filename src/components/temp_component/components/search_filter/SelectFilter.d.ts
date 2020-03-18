import * as React from "react";
interface IProps {
    SearchTypeSelect: (searchType: string) => void;
    searchTypes: string[];
    defaultValue: string;
}
export default class SelectFilter extends React.Component<IProps> {
    render(): JSX.Element;
    private SelectTypeSearch;
}
export {};
