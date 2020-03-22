import { FilterEntityContainer, FilterOptionsContainer } from "../../../model/CategoryEntity";
/**
 * return empty Filter container by index (RelatedId ofentity)
 * @param index index of the RelatedId where we put the FilterOptionsContainer
 * @returns {FilterOptionsContainer} the filter container
 */

 
export function emptyContainer(index: number): FilterOptionsContainer {
  const currentContainer: FilterOptionsContainer = {
    filterEntities: new Map<number, FilterEntityContainer>(),
    
  };
  currentContainer.filterEntities.set(index, { idCollection: [] });
  return currentContainer;
}
