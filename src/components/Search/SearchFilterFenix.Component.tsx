import * as React from 'react';
import { searchTypeAzureInput } from '../../redux/actionTypes/EntityFilterActionTypes';
import _ from "lodash";
import { ISearchType, TypeEntity } from '@fenix/tf-search-model';
import { ResultSelected, FilterOptionsContainer, EntityIndexNameResult, EntityIndexNameCategoryResult, FilterEntityContainer } from '../../model/CategoryEntity';
import { IFilterState } from '../../redux/reducer/FilterReducer';
import { SearchFenix, ISearchCategoryModel, ISearchBaseModel } from '@fenix/fenix-components';
import { ctxt } from "./../FenixProvider";
import { AzureInput } from '../../redux/actionTypes/AzureInput';



export interface ISearchFilterFenixProps {
  searchTypes: ISearchType[];
  onSelect: (input: searchTypeAzureInput) => void;
  isLoading: boolean;
  error: string | Error | null;
  resultSelected: (selected: ResultSelected) => void;
  source: IFilterState
}


function GetSourceModel(src: IFilterState, st: ISearchType): ISearchBaseModel[] | ISearchCategoryModel[] | null {
  if (st.entityType == TypeEntity.SEARCH) return null;

  

  let container: FilterOptionsContainer;

  if (st.mainEntityIndex && src.Indexes) {
    var localcontainer = src.Indexes.get(st.mainEntityIndex) as FilterOptionsContainer;

    if (!localcontainer) return null;
    container = localcontainer;
  } else if (!st.mainEntityIndex && src.Main) {
    container = src.Main;
  } else {
    return null;
  }


  let entities: FilterEntityContainer | undefined = container.filterEntities.get(st.entitySearchTypeIndex as number);
  if (!entities) return null;
  if (!entities.PropertyCollection) return null;
  if (st.entityType == TypeEntity.SELECTED) {
    const options = entities.PropertyCollection.get(st.propertyIndex as number) as EntityIndexNameResult[] | undefined;
    if (!options) return null;
    return options.map(s => ({ title: s.name, description: s.hits ? `${s.hits} encontrados` : "", id: s.id } as ISearchBaseModel));

  } else {
    const options = entities.PropertyCollection.get(st.propertyIndex as number) as EntityIndexNameCategoryResult[] | undefined;


    if (!options) return null;
    var optionsGroup = _.groupBy(options, s => s.category);

    let grp: ISearchCategoryModel[] = new Array();

    for (const key in optionsGroup) {
      if (optionsGroup.hasOwnProperty(key)) {
        const element = optionsGroup[key];
        grp.push({ name: key, results: element.map(a => ({ id: a.id, title: a.name, description: a.hits ? `${a.hits} encontrados` : "", category: key })) })
      }
    }

    return grp;
  }
}

export default function SearchFilterFenix(props: ISearchFilterFenixProps) {


  let { searchTypes, onSelect, isLoading, error, resultSelected, source } = props;
  const [currentSearchType, setCurrentSearchType] = React.useState(searchTypes[0] as ISearchType);


  const model = GetSourceModel(source, currentSearchType);


  const searchSelected: (src: ISearchType, azr:AzureInput) => void = (src, azr) => {
    setCurrentSearchType(src);

    if (src.entityType != TypeEntity.SEARCH) {
      onSelect(
        {
          index :azr.index,
          indexMainEntity: src.mainEntityIndex,
          indexEntitySearchType: src.entitySearchTypeIndex,
          indexFilters: searchTypes.filter(s => s.entitySearchTypeIndex).map(s => s.entitySearchTypeIndex) as number[],
          key: azr.key,
          maxFacets: currentSearchType.maxOptions,
          searchTypeData: {
            dataDependant: src.dataDependant,
            entityIndexCategory: src.categoryIndex,
            kind: src.entityType == TypeEntity.SELECTED_GROUP ? "RelatedCategory" : "Related",
            propertyIndex: src.propertyIndex || 6,
            propertyIndexCategory: src.propertyCategoryIndex || 6
          },
          url: azr.url

        });

    }

  }

  const elementselected: (elem: ISearchBaseModel) => void = (elem) => {
    resultSelected({ searchType: currentSearchType, value: elem });
  }


  return (
    <ctxt.Consumer>
      {context =>
        context && (
          <SearchFenix elementSelected={elementselected} loading={isLoading} searchTypeSelect={(s)=>searchSelected(s, context.searchConnect)} searchTypes={searchTypes}
            source={currentSearchType.entityType == TypeEntity.SELECTED ? model as ISearchBaseModel[] : undefined}
            sourceCategory={currentSearchType.entityType == TypeEntity.SELECTED_GROUP ? model as ISearchCategoryModel[] : undefined}
          />
        )

      }


    </ctxt.Consumer>
  );
}
