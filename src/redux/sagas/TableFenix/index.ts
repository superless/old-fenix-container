import { ITableInputConnect } from "../../../model/TableFenix/input";
import { put, call} from "redux-saga/effects";
import * as tableEvents from "./../../actionCreators/TableFenix";
import * as tableTypes from "./../../actionTypes/TableFenix";
import { GetTableSearch, GetTableNameSearch } from "../../external";
import { GetIdRelations } from "../../../util";
import { IResult } from "@fenix/tf-search-model";
import AzureInput from "../../../model/connection/AzureInput";
import * as Eff from 'redux-saga/effects'  

interface IIdName {
  id:string;
  name:string;
}

/**
 * truco por error en redux saga
 * https://stackoverflow.com/questions/58502778/how-to-repair-a-ts2769-no-overload-matches-this-call
 */

const takeEvery: any = Eff.takeEvery

async function loadIds(input : {[key:number]:string[]}, connect:AzureInput, indexPropName: number) : Promise<{[key:number]:IIdName[]}>{

    //init empty
    var result : {[key:number]:IIdName[]} = {};

    //asigna el nombre a cada id.
    for (const key of Object.keys(input)) {
        var numkey = Number.parseInt(key);
        var resultIds = await GetTableNameSearch({
          entityIndex : numkey,
          ids : input[numkey],
          index : connect.index,
          indexPropName : indexPropName,
          key : connect.key,
          url : connect.url

        });
       
       var idNames = resultIds.map(s=>({
          id : s.id,
          name : s.str.filter(a=>a.propertyIndex === indexPropName)[0].value
       } as IIdName));

       result = {...result, [numkey]:idNames};
       
    }
    
    return result;

    

}


function* onLoadTable(input: ITableInputConnect){
  try {
    //llamando el request para el loading
    yield put(tableEvents.GetTableRequest());

    // datos desde el search
    const tableResult : IResult = yield call(GetTableSearch, input);
    
    //indices de las relaciones y sus respectivos ids
    const relationsDictionary:{[key:number]:string[]}  = GetIdRelations(tableResult.entities) as {[key:number]:string[]};

    // obtiene nombres de cada elemento
    const names : {[key:number]:IIdName[]} = yield call(loadIds, relationsDictionary, input, input.propIndexName);
    
    
    const tableResultNames : IResult = {
      current : tableResult.current,
      total : tableResult.total,
      entities : tableResult.entities.map(s=>({
        ...s,
        rel : s.rel.map(r=>({...r, name : names[r.entityIndex].some(f=>f.id === r.entityId)? names[r.entityIndex].filter(f=>f.id === r.entityId)[0].name:""}))
      }))
    }
    
    
    
    yield put(tableEvents.GetTableSuccess(tableResultNames, input.entity));
  } catch (error) {
    yield put(tableEvents.GetTableFailure(error));
  }
}

export function* watchOnLoadTable() {
  // toma todas las llamadas, puede usar TakeLatest, que cancela las llamadas que se están procesando
  yield takeEvery(tableTypes.GET_TABLE_DATA, onLoadTable);
}