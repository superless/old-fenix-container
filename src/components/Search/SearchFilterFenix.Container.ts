import { connect } from "react-redux";
import { Dispatch } from "redux";
import {GetFilterSearchTypes} from "../../redux/actionCreators/EntityFilterActionCreator"
import * as actionTypes from "../../redux/actionTypes/EntityFilterActionTypes";
import SearchFilterFenix from "./SearchFilterFenix.Component";
import { AppState } from "../../redux/reducer/rootReducer";


const mapDispatchProps = (dispatch:Dispatch<actionTypes.GetSearchFilterTypesAction>) =>(
  {
    onSelect: (input: actionTypes.searchTypeAzureInput) =>{        
        dispatch(GetFilterSearchTypes(input))
      },
   

  }
);

const mapStateProps = (state : AppState) =>{
  return {
    result : state.collection.Entities,
    isLoading: state.isLoading[actionTypes.GET_SEARCH_TYPES_REQUEST] ,
    error: state.error[actionTypes.GET_SEARCH_TYPES_FAILURE],
    source : state.filter 
  }
}

export default connect(
  mapStateProps,
  mapDispatchProps
  
)(SearchFilterFenix);



