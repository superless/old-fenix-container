import ISearchBaseModel from "./ISearchBaseModel";
export interface ISearchCategoryModel {
    name: string;
    results: ISearchBaseModel[];
}
export declare type SearchCategoryModel = Map<string, ISearchCategoryModel>;
