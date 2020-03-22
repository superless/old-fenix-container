import * as React from 'react';
import { SearchType, IndexEntityRelatedIdCategory } from '../../model/CategoryEntity';
import { searchTypeAzureInput } from '../../redux/actionTypes/EntityFilterActionTypes';

export interface IFilterProps {
  urlAzure:string;
  azureKey:string;
  index:string; 
  searchTypes?: SearchType[];
  onSelect : (input : searchTypeAzureInput) => void;
  isLaading:boolean;
  error : string | Error | null;

}

export default function Filter (props: IFilterProps) {
  let { urlAzure, index, azureKey, onSelect} = props;
  
  

  React.useEffect(()=>{
      onSelect({
        index,
        key : azureKey,
        url : urlAzure,
        indexEntitySearchType : 21,
        indexFilters : [21],
        maxFacets : 200,
        searchTypeData : {
          dataDependant: true,
          kind:"RelatedCategory",
          propertyIndex : 6,
          entityIndexCategory : 30,
          propertyIndexCategory : 6
        } as IndexEntityRelatedIdCategory

      });

  },[])
  return (
    <div>
      sadada
    </div>
  );
}
