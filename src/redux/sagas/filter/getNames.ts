
import { EntityIndexNameCategoryResult, IndexEntityRelatedIdCategory } from "../../../model/CategoryEntity";
import { EntitySearch } from "../../../search/EntitySearch";






/**
 * Get the names of the categories, filling every element with the category name
 * @param options options without categoryName
 * @param category, category with the index where to found the name, and the property for the name
 * @param key key from azure
 * @param url url from azure
 * @param index index from azure
 */
export async function getNames(options : EntityIndexNameCategoryResult[], category :IndexEntityRelatedIdCategory, key: string, url: string, index: string, maxFacets: number): Promise<EntityIndexNameCategoryResult[]>{

  const idcategories : string[] = options.map(s=>s.categoryId);
  const ids : string[] = idcategories.filter((n, i) => idcategories.indexOf(n) === i);

  const join = `str/any(element: element/propertyIndex eq ${category.propertyIndexCategory}) and (id eq '${ids.join("' or id eq '")}')`;

  const filter = `entityIndex/any(element : element eq ${category.entityIndexCategory}) and ${join}`;
  const resultRemote = await EntitySearch(url, key, index, 1, maxFacets, filter,"", "id, str/value, str/propertyIndex");
  
  
  return options.map(o=>{
    const current = resultRemote.entities.filter(a=>a.id === o.categoryId )[0];

    o.category = current.str.filter(f=>f.propertyIndex === category.propertyIndex)[0].value;

    return o;

  });
}



