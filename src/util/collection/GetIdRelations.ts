import { IEntitySearch, IReletadIdTs } from "@fenix/tf-search-model";


const GetIdRelations : (entities: IEntitySearch[])=>{ [key: number]: string[]; } = e=>{

  //select many all rellations
  const allRelations: IReletadIdTs[] = e.reduce((p,u)=>[
    ...p,  // previo
    ...u.rel], 
    [] as IReletadIdTs[]
  );

  // groupBy [entityIndex] => ids[]
  return allRelations.reduce((p,u)=>({
    ...p,
    [u.entityIndex] : [...(p[u.entityIndex]|| []), u.entityId]
  } ),{} as { [key: number]: string[] }
  );
};

export default GetIdRelations;