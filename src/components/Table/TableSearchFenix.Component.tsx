import * as React from 'react';
import { IResult, Related, IEntitySearch } from '@fenix/tf-search-model';
import { TableFenix} from '@fenix/fenix-components';
import { ctxt, IFenixStoreElement } from "./../FenixProvider";
import { ITableInputConnect } from '../../model/TableFenix/input';


export interface INestedTableFenixProps { 
    entity:number;
    result : {[num:number]:IResult} | undefined,
    isLoading: boolean;
    itemPerPage : number;
    error: Error | string | null;
    propIndexName: number,
    enumValue:(indexEnun:number, valueEnum: number )=>string;
    onLoad?:(input : ITableInputConnect) => void;     
    headerRelated:(header:number)=>string;  
    headerProperty:(header:number, typeRelated: Related)=>string;
    cellheaders? :JSX.Element[];
    cells?: ((elem:IEntitySearch)=>JSX.Element)[];
}

export function TableSearchFenix (props: INestedTableFenixProps) {
  let {entity, result, isLoading} = props;
  const selectPage:(item:number, ctx: IFenixStoreElement)=>void = (it, c)=>{
    props.onLoad && props.onLoad({
      url : c.connect.searchConnect.url,
      elementsInPage: props.itemPerPage,
      entity,
      index : c.connect.searchConnect.index,
      key: c.connect.searchConnect.key,
      page:it,
      propIndexName : props.propIndexName

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
                elementsInPage: props.itemPerPage,
                entity,
                index : context.connect.searchConnect.index,
                key: context.connect.searchConnect.key,
                page:1,
                propIndexName : props.propIndexName
              });
              context.loadedTableComponent.set(entity, true);
            }

            
            
            return <TableFenix enumValue={props.enumValue} cellheaders={props.cellheaders} cells={props.cells} selectPage={i=>selectPage(i, context)} itemPerPage = {props.itemPerPage}  elements = {result?result[entity]:undefined} headerProperty={props.headerProperty} headerRelated={props.headerRelated} />
          }

          

      })}
      


    </ctxt.Consumer>
    
  );
}
