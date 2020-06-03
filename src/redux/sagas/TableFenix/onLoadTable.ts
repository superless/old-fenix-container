import { ITableInputConnect, ITableFilterInput } from "../../../model/TableFenix/input";
import { put, call } from "redux-saga/effects";
import { GetTableSearch } from "../../external";
import { GetIdRelations } from "../../../util";
import { IResult } from "@fenix/tf-search-model";
import { loadIds } from "./loadIds";
import { IIdName } from "./IIdName";
import * as tableEvents from "./../../actionCreators/TableFenix";

export function* onLoadTable(input: ITableInputConnect) {
  try {
    //llamando el request para el loading
    yield put(tableEvents.GetTableRequest());
    // datos desde el search
    const tableResult: IResult = yield call(GetTableSearch, input);
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
    const tableResultNames: IResult = {
      current: tableResult.current,
      total: tableResult.total,
      indexPropName : input.propIndexName,
      entities: tableResult.entities.map(s => ({
        ...s,
        rel: s.rel.map(r => ({ ...r, name: names[r.entityIndex].some(f => f.id === r.entityId) ? names[r.entityIndex].filter(f => f.id === r.entityId)[0].name : "" }))
      }))
    };
    yield put(tableEvents.GetTableSuccess(tableResultNames, input.entity, input.pathname));
  }
  catch (error) {
    yield put(tableEvents.GetTableFailure(error));
  }
}


