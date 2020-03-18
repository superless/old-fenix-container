import { SearchType } from "../../base/model/types/SearchType";
export default interface ISearchFilterSearchProps {
    searchTypes: SearchType[];
    defaultSearchType: SearchType;
    SearchTypeSelect: (searchTypeIndex: SearchType) => void;
    onEnter: (name: string) => void;
    loading: boolean;
}
