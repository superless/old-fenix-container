import { FilterEntityContainer, FilterOptionsContainer, EntityIndexNameResult, FacetContainer } from "../../../model/CategoryEntity";
import { emptyContainer } from "./emptyContainer";


/**
 * Set the related id of a Filter container from facets
 * when is facet, we store only the name
 * @param prev FilterContainer to update
 * @param currentIndex  Index of the element to search
 * @param propEntity  property entity of the element to search
 * @param facetResult facets from search
 * @returns {FilterOptionsContainer} Filter Updated with the ids
 */
export function setRelatedIdsFilterFromFacets(prev: FilterOptionsContainer, currentIndex: number, propEntity: number, facetResult: FacetContainer): FilterOptionsContainer {
  // inialize empty if container is null
  const currentContainer = prev ?? emptyContainer(currentIndex);
  // get the container of entities (RelatedIds) from the index
  const entityContainer = currentContainer.filterEntities.get(currentIndex) as FilterEntityContainer;
  // initialize the property collections if it is null.
  entityContainer.PropertyCollection = entityContainer.PropertyCollection ?? new Map<number, EntityIndexNameResult[]>();
  // save the facets with the property Index, the facets are the values from propertyId.
  // we set only the value.
  entityContainer.PropertyCollection.set(propEntity, facetResult.facets.map(s => ({ name: s.value, id: s.value } as EntityIndexNameResult)));
  // set the entity container with the new values
  currentContainer.filterEntities.set(currentIndex, entityContainer);
  return currentContainer;
}
