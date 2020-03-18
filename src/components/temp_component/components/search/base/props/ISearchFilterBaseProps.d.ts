import ISearchBaseModel from "../model/types/ISearchBaseModel";
import { ISearchCategoryModel } from "../model/types/ISearchCategoryModel";
import { SearchType } from "../model/types/SearchType";
export default interface ISearchFilterBaseProps {
    source?: ISearchBaseModel[];
    elementSelected: (name: string) => void;
    SearchTypeSelect: (searchType: string) => void;
    searchTypes: SearchType[];
    defaultSearchType: SearchType;
    messageNotFound: string;
    placeholder: string;
    sourceCategory?: ISearchCategoryModel[];
    isCategory: boolean;
}
