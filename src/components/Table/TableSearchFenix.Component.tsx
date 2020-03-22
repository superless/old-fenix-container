import * as React from 'react';
import { IResult } from 'tf-search-model';
import { TableFenix} from '../temp_component/index';
import { EntityActionAzureInput } from '../../redux/actionTypes/EntityTableActionTypes';

export interface INestedTableFenixProps {
   urlAzure:string;
   azureKey:string;
   index:string;
   entity:number;
   result : Map<number, IResult> | undefined,
   isLoading: boolean;
  error: Error | string | null;
   onLoad?:(input : EntityActionAzureInput) => void;
    headerRelated:(header:number)=>string;  
    headerProperty:(header:number)=>string;
    
    

}

export function TableSearchFenix (props: INestedTableFenixProps) {
  let {urlAzure, azureKey, index, entity, result, isLoading} = props;
  
 


  React.useEffect(()=>{

    if (props.onLoad){
      
      
      props.onLoad({
        url : urlAzure,
        ElementsInPage: 20,
        entity,
        index,
        key: azureKey,
        page:1,
        search:""

      });
    }
    
  },[]);
  return (
    <TableFenix  elements = {result?.get(entity)} loading={isLoading} headerProperty={props.headerProperty} headerRelated={props.headerRelated} />
  );
}
