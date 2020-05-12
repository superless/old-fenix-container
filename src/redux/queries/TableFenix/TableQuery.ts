import { ITableInput } from "../../../model/TableFenix/input";
import { ISearchQuery } from "../../../model/queries";


const TableQuery:(input : ITableInput)=>ISearchQuery = (input)=>{

  return {    
    skip : (input.page > 1 ? (input.page - 1) * input.elementsInPage : 0),
    facets : '',
    select : '',
    filter : `entityIndex/any(element: element eq ${input.entity}) `
  };

  
}

export default TableQuery;