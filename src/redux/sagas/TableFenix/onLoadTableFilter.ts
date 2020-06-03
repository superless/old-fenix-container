import { ITableFilterInputConnect } from "../../../model/TableFenix/input";
import { put, call } from "redux-saga/effects";
import { GetIdRelations } from "../../../util";
import { IResult } from "@fenix/tf-search-model";
import { loadIds } from "./loadIds";
import { IIdName } from "./IIdName";
import GetTableFilterSearch from "../../external/TableFenix/GetTableFilterSearch";
import * as tableEvents from "./../../actionCreators/TableFenix";

export function* onLoadTableFilter(input: ITableFilterInputConnect) {
  
  try {
    //llamando el request para el loading
    yield put(tableEvents.GetTableFilterRequest());
    // datos desde el search
    const tableResult: IResult = yield call(GetTableFilterSearch, input);

    

    const facets = tableResult.facets!.reduce((p, u) => ({
      ...p,
      [u.index]: [...(p[u.index] || []), u.value]
    }), {} as {
      [key: number]: string[];
    });
    
    //indices de las relaciones y sus respectivos ids
    const relationsDictionary: {
      [key: number]: string[];
    } = GetIdRelations(tableResult.entities) as {
      [key: number]: string[];
    };

    
    // obtiene nombres de cada elemento
    const names: {
      [key: number]: IIdName[];
    } = yield call(loadIds, relationsDictionary, input, input.propIndexName);
    const facetNames: {
      [key: number]: IIdName[];
    } = yield call(loadIds, facets, input, input.propIndexName);

    
    const facetsFinal = tableResult.facets!.map(f => ({ ...f, title: facetNames[f.index].some(s => s.id == f.value)?facetNames[f.index].filter(s => s.id == f.value)[0].name :""}));
    
    const tableResultNames: IResult = {
      current: tableResult.current,
      total: tableResult.total,
      entities: tableResult.entities.map(s => ({
        ...s,
        rel: s.rel.map(r => ({ ...r, name: names[r.entityIndex].some(f => f.id === r.entityId) ? names[r.entityIndex].filter(f => f.id === r.entityId)[0].name : "" }))
      })),
      filter: input.filter,
      facets: facetsFinal,
      indexPropName : input.propIndexName
    };
    
    yield put(tableEvents.GetTableFilterSuccess(tableResultNames, input.entity, input.pathname));
  }
  catch (error) {
    yield put(tableEvents.GetTableFilterFailure(error));
  }
}
