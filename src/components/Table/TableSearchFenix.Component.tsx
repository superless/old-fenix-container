import * as React from 'react';
import { IResult, Related, IEntitySearch, IFacet, IFilterModel, IFilterBase } from '@fenix/tf-search-model';
import { TableFenix } from '@fenix/fenix-components';
import { ctxt, IFenixStoreElement } from './../FenixProvider';
import { ITableFilterInputConnect } from '../../model/TableFenix/input';
import { IEntityNameId } from '@fenix/fenix-components/dist/components/Table/base/model';

export interface INestedTableFenixProps {
  entity: number;
  result: { [pathname: string]: { [num: number]: IResult } } | undefined;
  isLoading: boolean;
  itemPerPage: number;
  error: Error | string | null;
  propIndexName: number;
  pathName: string;
  enumValue: (indexEnun: number, valueEnum: number) => string;
  onLoad?: (input: ITableFilterInputConnect) => void;
  headerRelated: (header: number) => string;
  headerProperty: (header: number, typeRelated: Related) => string;
  cellheaders?: JSX.Element[];
  cells?: ((elem: IEntitySearch) => JSX.Element)[];
  filter?: boolean;
}

export interface INestedTableFenixState {
    currentPage:number,
    currentFilter : IFilterModel
}

export class TableSearchFenix extends React.Component<INestedTableFenixProps,INestedTableFenixState>{

  /**
   *
   */
  constructor(props : INestedTableFenixProps) {
    super(props);
    
    this.selectPage.bind(this);
    this.filters.bind(this);
    this.clean.bind(this);
    this.state = {currentPage: 1, currentFilter :{}}
    

  }
  public render(){
    

    return (<ctxt.Consumer>
      {context => {
        if (context) {
          const {onLoad, entity, itemPerPage, propIndexName, pathName, result} = this.props;
          if (onLoad && !context.loadedTableComponent?.get(entity)) {
            context.loadedTableComponent.set(entity, false);
            onLoad({
              url: context.connect.searchConnect.url,
              elementsInPage: itemPerPage,
              entity,
              index: context.connect.searchConnect.index,
              key: context.connect.searchConnect.key,
              page: 1,
              propIndexName: propIndexName,
              pathname: pathName,
              filter: this.state.currentFilter,
            });
            context.loadedTableComponent.set(entity, true);
          }

          const resultState = result
            ? result[pathName]
              ? result[pathName][entity]
                ? result[pathName][entity]
                : undefined
              : undefined
            : undefined;
          
            const filter = resultState?resultState.filter?resultState.filter:undefined :undefined;

            const filterIds = filter?filter.filterEntity?
            Object.keys(filter.filterEntity!).reduce(
              (p: { [key: string]: string[] }, u) => ({
                ...p,
                [u]: [
                  ...(p[u] || []),
                  ...(filter.filterEntity
                    ? filter.filterEntity[Number(u)].map(s => s.value)
                    : []),
                ],
              }),
              {},
            ):undefined: undefined;

          var facetFilter =
            resultState?.facets &&
            resultState?.facets.reduce(
              (p: { [num: number]: IEntityNameId[] }, u) => ({
                ...p,
                [u.index]: [...(p[u.index] || []), { index: u.value, title: u.title } as IEntityNameId],
              }),
              {},
            );
          
          

          return (
            <TableFenix
              filters={(i,s)=>this.filters(i,s,context)}
              filtersValues={facetFilter}
              filter={this.props.filter || false}
              enumValue={this.props.enumValue}
              cellheaders={this.props.cellheaders}
              cells={this.props.cells}
              selectPage={i => this.selectPage(i, context)}
              itemPerPage={this.props.itemPerPage}
              elements={resultState}
              headerProperty={this.props.headerProperty}
              headerRelated={this.props.headerRelated}
              filtersSelected={filterIds}
              clean={()=>this.clean(context)}

            />
          );
        }
      }}
    </ctxt.Consumer>)

  }

  private clean(ctx : IFenixStoreElement){
    this.selectPage(1,ctx, {filterEntity : {}})
  }

  private filters(item: number, selecteds: string[], ctx : IFenixStoreElement){
      
      const newState = {...this.state, currentFilter : {filterEntity : {...(this.state.currentFilter.filterEntity || {}), [item]:selecteds.map(s=>({value : s } as IFilterBase<string>))}}};
      
      this.selectPage(1, ctx, newState.currentFilter);
  }

  private selectPage(item: number, ctx : IFenixStoreElement, filter:IFilterModel | undefined = undefined ){
    let { entity, result, isLoading } = this.props;
    
    this.props.onLoad &&
    this.props.onLoad({
      url: ctx.connect.searchConnect.url,
      elementsInPage: this.props.itemPerPage,
      entity,
      index: ctx.connect.searchConnect.index,
      key: ctx.connect.searchConnect.key,
      page: item,
      propIndexName: this.props.propIndexName,
      pathname: this.props.pathName,
      filter: filter ?? this.state.currentFilter,
    });
    console.log(this.state.currentFilter);
    this.setState({currentPage : item, currentFilter: filter?filter:this.state.currentFilter});
  }
  
}

