import { IRelatedIds } from "./IRelatedIds";
import { IProperty } from "./IProperty";
import { IEnumerationRelated } from "./IEnumerationRelated";

export interface IEntitySearch {
  Id : string;
  EntityIndex : number;
  Created : Date;
  RelatedIds : IRelatedIds[];
  RelatedProperties : IProperty[];
  RelatedEnumValues : IEnumerationRelated[];
}