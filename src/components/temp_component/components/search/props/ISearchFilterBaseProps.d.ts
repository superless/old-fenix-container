import ISearchBaseModel from "../model/types/ISearchBaseModel";
import { ISearchCategoryModel } from "../model/types/ISearchCategoryModel";
export default interface ISearchFilterBaseProps {
    source?: ISearchBaseModel[];
    elementSelected: (name: string) => void;
    SearchTypeSelect: (searchType: string) => void;
    searchTypes: string[];
    defaultSearchType: string;
    messageNotFound: string;
    placeholder: string;
    sourceCategory?: ISearchCategoryModel[];
    isCategory: boolean;
}
