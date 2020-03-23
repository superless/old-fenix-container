/// <reference types="react" />
import { SearchType } from 'tf-search-model';
import { ISearchBaseModel } from './search/base/model/types/ISearchBaseModel';
import { ISearchCategoryModel } from './search/base/model/types/ISearchCategoryModel';
export interface ISearchFilterProps {
    searchTypes: SearchType[];
    searchTypeSelect: (searchType: SearchType) => void;
    elementSelected: (name: ISearchBaseModel) => void;
    source?: ISearchBaseModel[];
    sourceCategory?: ISearchCategoryModel[];
    loading: boolean;
}
export declare function SearchFenix(props: ISearchFilterProps): JSX.Element;
