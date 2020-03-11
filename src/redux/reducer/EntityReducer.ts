import * as actions from "./../actionTypes/EntityActionTypes";
import { IResult } from "../../model/IResult";
import { IRelatedIds } from "../../model/IRelatedIds";


export interface IEntityState {
  Entities: Map<number, IResult>

}

const initialState: IEntityState = {
  Entities: new Map<number, IResult>(),
}

export function EntityReducer(
  state: IEntityState = initialState,
  action: actions.EntityAction

): IEntityState {
  switch (action.type) {
    case actions.GET_SEARCH_ENTITY_SUCCESS:
      state.Entities.set(action.entity, action.value)
      return state;
    case actions.GET_SEARCH_ENTITY_SUCCESS_NAME:
      let entities = state.Entities.get(action.entity);


      if (entities && entities.total > 0) {
        
        entities.entities = entities.entities.map(s => {
          var names = action.value.entities.map(i=>({id : i.Id, name : i.RelatedProperties.filter(f=>f.PropertyIndex ===6)[0].Value}));
          console.log(names);



          s.RelatedIds = s.RelatedIds.map(a => ({ ...a, name:names.some(s=>s.id === a.EntityId)? names.filter(s=>s.id === a.EntityId)[0].name:""}));
          console.log(s);
          
          return s;

        });
        state.Entities.set(action.entity, entities);
        console.log("done");
      }
      
      return state;


    default:
      return state;

  }
}
