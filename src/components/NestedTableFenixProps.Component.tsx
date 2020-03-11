import * as React from 'react';
import { IResult } from '../model/IResult';

export interface INestedTableFenixProps {
   urlAzure:string;
   azureKey:string;
   index:string;
   entity:number;
   result : Map<number, IResult> | undefined,
   isLoading: boolean;
  error: Error | string | null;
   onLoad:(url: string,
    key: string,
    index: string,
    entity: number,
    page: number,
    ElementsInPage: number,
    search: string) => any;
    
    loadName:(url: string,
      key: string,
      index: string,
      entity: number,
      page: number,
      ElementsInPage: number,
      search: string,
      ids:string[]
      ) => any;

}

export function NestedTableFenix (props: INestedTableFenixProps) {
  let {urlAzure, azureKey, index, entity, result, isLoading} = props;
  const [loaded, setLoaded] = React.useState(false);
 


  React.useEffect(()=>{

    if (props.onLoad && !loaded){
      
      props.onLoad(urlAzure,azureKey, index,entity,1,20,"");
    }
    
  },[]);

  
  if (!loaded && result && result.get(entity) ){

    let total = result.get(entity)?.total??0;
    if (total>0){
        let localResult = result.get(entity) as IResult;        
        let ids : string[] = localResult.entities.reduce((pn:string[], u) => [ ...pn, ...u.RelatedIds.map(s=>s.EntityId) ], []);
        let uniqueIds : string[] = Array.from(new Set(ids.map(item => item)));
        props.loadName(urlAzure, azureKey, index, entity, 1,100, "", uniqueIds);
        setLoaded(true);
    }


      
   
  }

  console.log(result);
  
  return (
    <div>
      thinking deiby {props.urlAzure} el
    </div>
  );
}
