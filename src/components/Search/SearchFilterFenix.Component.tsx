import * as React from 'react';
import { searchTypeAzureInput } from '../../redux/actionTypes/EntityFilterActionTypes';
import _ from "lodash";
import { SearchType } from 'tf-search-model';
import { ResultSelected, FilterOptionsContainer, EntityIndexNameResult, EntityIndexNameCategoryResult, FilterEntityContainer } from '../../model/CategoryEntity';
import { IFilterState } from '../../redux/reducer/FilterReducer';
import { SearchFenix, ISearchCategoryModel, ISearchBaseModel} from '../temp_component/index';



export interface ISearchFilterFenixProps {
  urlAzure:string;
  azureKey:string;
  index:string; 
  searchTypes: SearchType[];
  onSelect : (input : searchTypeAzureInput) => void;
  isLoading:boolean;
  error : string | Error | null;
  resultSelected: (selected: ResultSelected)=>void;
  source: IFilterState
}


function GetSourceModel(src : IFilterState, st:SearchType) : ISearchBaseModel[] | ISearchCategoryModel[] | null  {
    if(st.entityType === "search") return null;
    let container: FilterOptionsContainer;

    if (st.mainEntityIndex && src.Indexes){
        var localcontainer = src.Indexes.get(st.mainEntityIndex) as FilterOptionsContainer;
        
        if (!localcontainer) return null;
        container = localcontainer;
    } else if (!st.mainEntityIndex && src.Main){
        container = src.Main;
    } else {
      return null;
    }

    
    let entities : FilterEntityContainer | undefined = container.filterEntities.get(st.entitySearchTypeIndex as number);
    if (!entities) return null;
    if (!entities.PropertyCollection) return null;
    if (st.entityType == "selected"){      
        const options = entities.PropertyCollection.get(st.propertyIndex as number) as EntityIndexNameResult[] | undefined;
        if (!options) return null;
        return options.map(s=>({ title : s.name, description : s.hits?`${s.hits} encontrados`:"", id: s.id  } as ISearchBaseModel));
      
    } else {
      const options = entities.PropertyCollection.get(st.propertyIndex as number) as EntityIndexNameCategoryResult[] | undefined;

      
      if (!options) return null;
      var optionsGroup = _.groupBy(options, s => s.category);
      
      let grp:ISearchCategoryModel[] = new Array();

      for (const key in optionsGroup) {
        if (optionsGroup.hasOwnProperty(key)) {
          const element = optionsGroup[key];
          grp.push({name : key, results : element.map(a=>({ id : a.id , title : a.name, description : a.hits?`${a.hits} encontrados`:"", category : key}))})
        }
      }
      
      return grp;
    }
}

export default function SearchFilterFenix (props: ISearchFilterFenixProps) {

  
  let { searchTypes, urlAzure, index, azureKey, onSelect, isLoading, error, resultSelected, source} = props;
  const [currentSearchType, setCurrentSearchType] = React.useState(searchTypes[0]  as SearchType);

  
  const model = GetSourceModel(source, currentSearchType);


  const searchSelected : (src:SearchType)=>void = (src)=>{
    setCurrentSearchType(src);

    if (src.entityType != "search") {
      onSelect(
        {index , 
          indexMainEntity: src.mainEntityIndex, 
          indexEntitySearchType : src.entitySearchTypeIndex,
          indexFilters : searchTypes.filter(s=>s.entitySearchTypeIndex).map(s=>s.entitySearchTypeIndex) as number[],
          key : azureKey,
          maxFacets : currentSearchType.maxOptions,
          searchTypeData : {
            dataDependant : src.dataDependant,
            entityIndexCategory : src.categoryIndex ,
            kind : src.entityType=="selectedGroup"?"RelatedCategory":"Related",
            propertyIndex : src.propertyIndex || 6,
            propertyIndexCategory : src.propertyCategoryIndex || 6
          },
          url : urlAzure
          
          });
      
    }
    
  }

  const elementselected : (elem:ISearchBaseModel)=>void = (elem)=>{
    resultSelected({searchType: currentSearchType, value: elem});
  }

  
  return (
    <SearchFenix elementSelected={elementselected} loading = {isLoading} searchTypeSelect={searchSelected} searchTypes={searchTypes} 
      source = {currentSearchType.entityType=="selected"?model as ISearchBaseModel[]:undefined}
      sourceCategory= {currentSearchType.entityType=="selectedGroup"?model as ISearchCategoryModel[]:undefined}
      
    />
  );
}
