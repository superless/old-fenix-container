import { ITableInput } from "../../../model/TableFenix/input";
import { ISearchQuery } from "../../../model/queries";


const TableQuery:(input : ITableInput)=>ISearchQuery = (input)=>({    
  skip : (input.page > 1 ? (input.page - 1) * input.elementsInPage : 0),
  facets : undefined,
  select : '',
  filter : `entityIndex/any(element: element eq ${input.entity}) `
})

export default TableQuery;