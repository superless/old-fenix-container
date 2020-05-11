import { FilterEntityContainer, FilterOptionsContainer, EntityIndexNameCategoryResult, EntityIndexNameResult } from "../../../model/CategoryEntity";
import { IEntitySearch } from "@fenix/tf-search-model";
import { emptyContainer } from "./emptyContainer";


/**
 * Set the RelatedIds of a filter (collection of id, name and category [optional]).
 * get the list of options in the search, if categoryIndex is not null, will add the category property in every option item.
 * @param prev FilterOptionsContainer to update
 * @param currentIndex  index where we put the result, index of the search.
 * @param propEntity property index of the name
 * @param elements elements from seacrh
 * @param categoryRelatedIndex category index, if the category index exists, will return the categoy id in the result
 * @returns {FilterOptionsContainer} Filter Container with the RelatedIds
 */
export function setRelatedIdsFilter(prev: FilterOptionsContainer, currentIndex: number, propEntity: number, elements: IEntitySearch[], categoryRelatedIndex?: number): FilterOptionsContainer {
  const currentContainer = prev ?? emptyContainer(currentIndex);

  
  // get the { name: , id:, categoryId:) from Entity
  const options = elements.map(s => ({
    name: s.str.filter(s => s.propertyIndex === propEntity)[0].value,
    id: s.id,
    categoryId: !categoryRelatedIndex ? '' : s.rel.filter(s => s.entityIndex === categoryRelatedIndex)[0].entityId
  }));

  
  const relatedContainer = currentContainer.filterEntities.get(currentIndex) as FilterEntityContainer;
  //initialize depend of category
  relatedContainer.PropertyCollection = categoryRelatedIndex ? new Map<number, EntityIndexNameCategoryResult[]>() : new Map<number, EntityIndexNameResult[]>();
  //set category, include the categoryid.
  if (categoryRelatedIndex) {
    relatedContainer.PropertyCollection.set(propEntity, options.map(s => ({
      id: s.id,
      name: s.name,
      hits: relatedContainer.idCollection.filter(a => a.value === s.id)[0].count,
      categoryId: s.categoryId
    })));
  }
  else {
    // set no category only the id and name
    relatedContainer.PropertyCollection.set(propEntity, options.map(s => ({
      id: s.id,
      name: s.name,
      hits: relatedContainer.idCollection.filter(a => a.value === s.id)[0].count,
    })));
  }
  currentContainer.filterEntities.set(currentIndex, relatedContainer);
  return currentContainer;
}
