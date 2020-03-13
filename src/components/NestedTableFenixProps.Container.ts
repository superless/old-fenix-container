import { connect } from "react-redux";
import { Dispatch } from "redux";
import {GetSearchEntity} from "../redux/actionCreators/EntityActionCreator";
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
   

  }
);

const mapStateProps = (state : AppState) =>{
  return {
    result : state.entities.Entities,
    isLoading: state.isLoading[actionTypes.GET_SEARCH_ENTITY] ,
    error: state.error[actionTypes.GET_SEARCH_ENTITY] 
  }
}

export default connect(
  mapStateProps,
  mapDispatchProps
  
)(NestedTableFenix);



