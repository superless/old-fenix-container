import { ISearchQuery } from "../../../model/queries";



const TableQueryNames: (entityIndex : number, ids:string[], indexPropName: number)=>ISearchQuery = (entityIndex, ids, indexPropName) =>{
  return {
    select : 'str/propertyIndex,str/value, id',
    filter : `entityIndex/any(element: element eq ${entityIndex}) and  str/any(element: element/propertyIndex eq ${indexPropName}) and search.in(id,'${ids.join(",")}')`,
  };
}

export default TableQueryNames;
