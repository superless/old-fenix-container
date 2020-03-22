
import { EntityIndexNameCategoryResult, IndexEntityRelatedIdCategory } from "../../../model/CategoryEntity";
import { EntitySearch } from "../../../search/EntitySearch";


/**
 * Get the Name of a entity
 * @param index index of the azure search
 * @param key key of azure search
 * @param url url from azure searcj
 * @param entityIndex index of the entity where the query will return the name
 * @param indexProperty index of property of the name
 * @param id id of the entity
 * @returns {Promise<string>} The Name of the identify
 */
async function getNameFromId(index: string, key: string, url: string, entityIndex: number, indexProperty: number, id: string): Promise<string> {

  // get the entity from search
  const remoteResult = await EntitySearch(url, key, index, 1, 10, `EntityIndex eq ${entityIndex} and Id eq '${id}'`);


  
  if (remoteResult.total === 0) return "";

  //return the name.
  return remoteResult.entities[0].RelatedProperties.filter(s => s.PropertyIndex === indexProperty)[0].Value;
}




/**
 * Get the names of the categories, filling every element with the category name
 * @param options options without categoryName
 * @param category, category with the index where to found the name, and the property for the name
 * @param key key from azure
 * @param url url from azure
 * @param index index from azure
 */
export async function getNames(options : EntityIndexNameCategoryResult[], category :IndexEntityRelatedIdCategory, key: string, url: string, index: string): Promise<EntityIndexNameCategoryResult[]>{
  return Promise.all(options.map(async s => {

    var result = await getNameFromId(index, key, url, category.entityIndexCategory, category.propertyIndexCategory, s.categoryId);

    s.category = result;

    return s;
  }))
}



