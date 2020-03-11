import { connect } from "react-redux";
import { Dispatch } from "redux";
import {GetSearchEntity, GetSearchEntityName} from "../redux/actionCreators/EntityActionCreator";
import * as actionTypes from "../redux/actionTypes/EntityActionTypes";
import {NestedTableFenix} from "./NestedTableFenixProps.Component";
import { AppState } from "../redux/reducer/rootReducer";

const mapDispatchProps = (dispatch:Dispatch<actionTypes.EntityAction>) =>(
  {
    onLoad: (url: string,
      key: string,
      index: string,
      entity: number,
      page: number,
      ElementsInPage: number,
      search: string) =>{
        
        dispatch(GetSearchEntity(url, key, index, entity, page, ElementsInPage, search))
      },
    loadName:(url: string,
      key: string,
      index: string,
      entity: number,
      page: number,
      ElementsInPage: number,
      search: string,
      ids:string[])=>{
        dispatch(GetSearchEntityName(url, key, index, entity, page, ids,ElementsInPage,search ))

    }

  }
);

const mapStateProps = (state : AppState) =>{
  return {
    result : state.entities.Entities,
    isLoading: state.isLoading[actionTypes.GET_SEARCH_ENTITY] || state.isLoading[actionTypes.GET_SEARCH_ENTITY_NAME],
    error: state.error[actionTypes.GET_SEARCH_ENTITY] || state.error[actionTypes.GET_SEARCH_ENTITY_NAME]
  }
}

export default connect(
  mapStateProps,
  mapDispatchProps
  
)(NestedTableFenix);



