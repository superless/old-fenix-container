import * as React from 'react';
import { IResult, Related } from '@fenix/tf-search-model';
import { TableFenix} from '@fenix/fenix-components';
import { EntityActionAzureInput } from '../../redux/actionTypes/EntityTableActionTypes';
import { ctxt, IFenixStoreElement } from "./../FenixProvider";


export interface INestedTableFenixProps { 
    entity:number;
    result : Map<number, IResult> | undefined,
    isLoading: boolean;
    itemPerPage : number;
    error: Error | string | null;
    onLoad?:(input : EntityActionAzureInput) => void;     
    headerRelated:(header:number)=>string;  
    headerProperty:(header:number, typeRelated: Related)=>string;
}

export function TableSearchFenix (props: INestedTableFenixProps) {
  let {entity, result, isLoading} = props;
  const selectPage:(item:number, ctx: IFenixStoreElement)=>void = (it, c)=>{
    props.onLoad && props.onLoad({
      url : c.connect.searchConnect.url,
      ElementsInPage: props.itemPerPage,
      entity,
      index : c.connect.searchConnect.index,
      key: c.connect.searchConnect.key,
      page:it,
      search:""
    });
  }

  return (

    <ctxt.Consumer>

      {(context=>{
          if (context){
            
            if (props.onLoad && !context.loadedTableComponent?.get(entity)){
              context.loadedTableComponent.set(entity, false);
              props.onLoad({
                url : context.connect.searchConnect.url,
                ElementsInPage: props.itemPerPage,
                entity,
                index : context.connect.searchConnect.index,
                key: context.connect.searchConnect.key,
                page:1,
                search:""
              });
              context.loadedTableComponent.set(entity, true);
            }

            
            
            return <TableFenix selectPage={i=>selectPage(i, context)} itemPerPage = {props.itemPerPage}  elements = {result?.get(entity)} loading={isLoading} headerProperty={props.headerProperty} headerRelated={props.headerRelated} />
          }

          

      })}
      


    </ctxt.Consumer>
    
  );
}
