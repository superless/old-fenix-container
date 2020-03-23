import { ISearchBaseModel } from "../model/types/ISearchBaseModel";
import { ISearchCategoryModel } from "../model/types/ISearchCategoryModel";
import { SearchType } from "tf-search-model";
export default interface ISearchFilterBaseProps {
    source?: ISearchBaseModel[];
    elementSelected: (name: ISearchBaseModel) => void;
    SearchTypeSelect: (searchType: SearchType) => void;
    searchTypes: SearchType[];
    defaultSearchType: SearchType;
    messageNotFound: string;
    placeholder: string;
    sourceCategory?: ISearchCategoryModel[];
    isCategory: boolean;
    loading: boolean;
}
