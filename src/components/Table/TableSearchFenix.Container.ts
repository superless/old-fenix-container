import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as tableTypes from "../../redux/actionTypes/TableFenix";
import {TableSearchFenix} from "./TableSearchFenix.Component";
import { AppState } from "../../redux/reducer/rootReducer";

import { GetTableData } from "../../redux/actionCreators/TableFenix";
import { ITableInputConnect } from "../../model/TableFenix/input";

const mapDispatchProps = (dispatch:Dispatch<tableTypes.ITableReduxGetData>) =>(
  {
    onLoad: (input: ITableInputConnect) =>{        
        dispatch(GetTableData(input))
      },
   

  }
);

const mapStateProps = (state : AppState) =>{
  
  return {
    result : state.collection.Entities,
    isLoading: state.isLoading[tableTypes.GET_TABLE_DATA] ,
    error: state.error[tableTypes.GET_TABLE_DATA] 
  }
}

export default connect(
  mapStateProps,
  mapDispatchProps
  
)(TableSearchFenix);



