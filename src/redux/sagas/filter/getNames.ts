
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

  const join = `RelatedProperties/any(element: element/PropertyIndex eq ${category.propertyIndexCategory}) and (Id eq '${ids.join("' or Id eq '")}')`;

  const filter = `EntityIndex eq ${category.entityIndexCategory} and ${join}`;
  const resultRemote = await EntitySearch(url, key, index, 1, maxFacets, filter,"", "Id, RelatedProperties/Value, RelatedProperties/PropertyIndex");
  
  return options.map(o=>{
    const current = resultRemote.entities.filter(a=>a.Id === o.categoryId )[0];

    o.category = current.RelatedProperties.filter(f=>f.PropertyIndex === category.propertyIndex)[0].Value;

    return o;

  });
}



