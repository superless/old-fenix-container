import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as tableTypes from "../../redux/actionTypes/TableFenix";
import {TableSearchFenix} from "./TableSearchFenix.Component";

import { GetTableFilterData } from "../../redux/actionCreators/TableFenix";
import { ITableInputConnect, ITableFilterInputConnect } from "../../model/TableFenix/input";

const mapDispatchProps = (dispatch:Dispatch<tableTypes.ITableReduxFilterGetData>) =>(
  {
    onLoad: (input: ITableFilterInputConnect) =>{        
        dispatch(GetTableFilterData(input))
      },
   

  }
);

const mapStateProps = (state : any) =>{
  return {
    result : state.collection.Entities,
    isLoading: state.isLoading[tableTypes.GET_FILTER_TABLE] ,
    error: state.error[tableTypes.GET_FILTER_TABLE] 
  }
}

export default connect(
  mapStateProps,
  mapDispatchProps  
)(TableSearchFenix);



