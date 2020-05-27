import * as React from 'react';
import { IResult, Related, IEntitySearch, IFacet } from '@fenix/tf-search-model';
import { TableFenix} from '@fenix/fenix-components';
import { ctxt, IFenixStoreElement } from "./../FenixProvider";
import { ITableFilterInputConnect } from '../../model/TableFenix/input';
import { IEntityNameId } from '@fenix/fenix-components/dist/components/Table/base/model';


export interface INestedTableFenixProps { 
    entity:number;
    result : {[pathname:string]:{[num:number]:IResult}} | undefined,
    isLoading: boolean;
    itemPerPage : number;
    error: Error | string | null;
    propIndexName: number,
    pathName:string,
    enumValue:(indexEnun:number, valueEnum: number )=>string;
    onLoad?:(input : ITableFilterInputConnect) => void;     
    headerRelated:(header:number)=>string;  
    headerProperty:(header:number, typeRelated: Related)=>string;
    cellheaders? :JSX.Element[];
    cells?: ((elem:IEntitySearch)=>JSX.Element)[];
    filter?:boolean;
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
      propIndexName : props.propIndexName,
      pathname : props.pathName,
      filter : {}
    });
  }

  
console.log(result);
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
                propIndexName : props.propIndexName,
                pathname : props.pathName,
                filter : {}
              });
              context.loadedTableComponent.set(entity, true);
            }

            

            
            const resultState = result?result[props.pathName]?result[props.pathName][entity]?result[props.pathName][entity]:undefined:undefined:undefined;
            var facetFilter = resultState?.facets && resultState?.facets
            .reduce((p:{[num:number]:IEntityNameId[]}, u) => ({
                ...p,
                [u.index]: [...(p[u.index] || []), { index : u.value, title : u.title } as IEntityNameId]
              }),{});

            
            return <TableFenix filtersValues={facetFilter}  filter={props.filter || false} enumValue={props.enumValue} cellheaders={props.cellheaders} cells={props.cells} selectPage={i=>selectPage(i, context)} itemPerPage = {props.itemPerPage}  elements = {resultState} headerProperty={props.headerProperty} headerRelated={props.headerRelated}  />
          }

          

      })}
      


    </ctxt.Consumer>
    
  );
}
