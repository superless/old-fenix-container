import * as React from 'react';
import { IResult, Related } from 'tf-search-model';
import { TableFenix} from './../temp_component/index';
import { EntityActionAzureInput } from '../../redux/actionTypes/EntityTableActionTypes';
import { ctxt } from "./../FenixProvider";


export interface INestedTableFenixProps {
  
   entity:number;
   result : Map<number, IResult> | undefined,
   isLoading: boolean;
  error: Error | string | null;
   onLoad?:(input : EntityActionAzureInput) => void;
    headerRelated:(header:number)=>string;  
    headerProperty:(header:number, typeRelated: Related)=>string;
    
    

}

export function TableSearchFenix (props: INestedTableFenixProps) {
  let {entity, result, isLoading} = props;
  
  const [loaded, setLoaded] = React.useState(false);
  
 


  
  return (

    <ctxt.Consumer>

      {(context=>{
          if (context){
            if (props.onLoad && !loaded){
      
      
              props.onLoad({
                url : context.searchConnect.url,
                ElementsInPage: 20,
                entity,
                index : context.searchConnect.index,
                key: context.searchConnect.key,
                page:1,
                search:""
        
              });
              setLoaded(true);
            }

            
            
            return <TableFenix  elements = {result?.get(entity)} loading={isLoading} headerProperty={props.headerProperty} headerRelated={props.headerRelated} />
          }

          

      })}
      


    </ctxt.Consumer>
    
  );
}
