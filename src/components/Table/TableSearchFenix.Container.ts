import { connect } from "react-redux";
import { Dispatch } from "redux";
import {GetSearchEntity} from "../../redux/actionCreators/EntityTableActionCreator";
import * as actionTypes from "../../redux/actionTypes/EntityTableActionTypes";
import {TableSearchFenix} from "./TableSearchFenix.Component";
import { AppState } from "../../redux/reducer/rootReducer";
import { EntityActionAzureInput } from "../../redux/actionTypes/EntityTableActionTypes";

const mapDispatchProps = (dispatch:Dispatch<actionTypes.EntityTableAction>) =>(
  {
    onLoad: (input: EntityActionAzureInput) =>{        
        dispatch(GetSearchEntity(input))
      },
   

  }
);

const mapStateProps = (state : AppState) =>{
  return {
    result : state.collection.Entities,
    isLoading: state.isLoading[actionTypes.GET_SEARCH_ENTITY] ,
    error: state.error[actionTypes.GET_SEARCH_ENTITY] 
  }
}

export default connect(
  mapStateProps,
  mapDispatchProps
  
)(TableSearchFenix);



