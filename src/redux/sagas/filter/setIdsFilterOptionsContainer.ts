import { FilterEntityContainer, FilterOptionsContainer, FacetContainer, Facet } from "../../../model/CategoryEntity";
import _ from 'lodash';
import { emptyContainer } from "./emptyContainer";



export function setIdsFilterOptionsContainer(prev: FilterOptionsContainer, currentIndex: number, facetResult: FacetContainer): FilterOptionsContainer {
  // empty container if the previous is null
  const currentContainer = prev ?? emptyContainer(currentIndex);
  // Container of the Index (RelatedId), example 21 => Variety.
  const entityContainer = currentContainer.filterEntities.get(currentIndex) as FilterEntityContainer;
  // we set the ids of the main element (index), if is setted there is no need to go for this.
  if (entityContainer.idCollection.length > 0)
    return currentContainer;
  // group by entityIndex of the search, every EntityIndex is a RelatedId 
  var grouped = _.groupBy(facetResult.facets, s => s.index) as _.Dictionary<Facet[]>;
  // setting the ids of every facet.
  for (const key in grouped) {
    if (grouped.hasOwnProperty(key)) {
      const element = grouped[key];
      currentContainer.filterEntities.set(Number.parseInt(key), {
        idCollection: element.map(s => ({ count: s.count, value: s.value }))
      });
    }
  }
  return currentContainer;
}
