import * as React from 'react';
import { IResult } from 'tf-search-model';
import { TableFenix} from '../temp_component/index';

export interface INestedTableFenixProps {
   urlAzure:string;
   azureKey:string;
   index:string;
   entity:number;
   result : Map<number, IResult> | undefined,
   isLoading: boolean;
  error: Error | string | null;
   onLoad:(url: string,
    key: string,
    index: string,
    entity: number,
    page: number,
    ElementsInPage: number,
    search: string) => any;
    headerRelated:(header:number)=>string;  
    headerProperty:(header:number)=>string;
    
    

}

export function NestedTableFenix (props: INestedTableFenixProps) {
  let {urlAzure, azureKey, index, entity, result, isLoading} = props;
  
 


  React.useEffect(()=>{

    if (props.onLoad){
      
      props.onLoad(urlAzure,azureKey, index,entity,1,20,"");
    }
    
  },[]);
  return (
    <TableFenix  elements = {result?.get(entity)} loading={isLoading} headerProperty={props.headerProperty} headerRelated={props.headerRelated} />
  );
}
