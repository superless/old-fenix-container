import { EntityIndexNameCategoryResult, IndexEntityRelatedIdCategory, FilterEntityContainer, FacetContainer, IndexEntityName, FilterOptionsContainer } from "../../model/CategoryEntity";
import { put, call, takeEvery} from "redux-saga/effects";
import { FacetWithProperty, EntitySearch, FacetEntitySearch } from "../../search/EntitySearch";
import * as actionFilterCreators from "../actionCreators/EntityFilterActionCreator";
import * as actionFilterTypes from "../actionTypes/EntityFilterActionTypes";

import { IResult } from "tf-search-model";

import { getNames } from "./filter/getNames";
import { setIdsFilterOptionsContainer } from "./filter/setIdsFilterOptionsContainer";
import { setRelatedIdsFilter } from "./filter/setRelatedIdsFilter";
import { setRelatedIdsFilterFromFacets } from "./filter/setRelatedIdsFilterFromFacets";
import { emptyContainer } from "./filter/emptyContainer";
import _ from 'lodash';



/**
 * Get the options of a search filter.
 * @param index index of the azure search
 * @param key key of the azure search
 * @param url url from azure search
 * @param indexMainEntity index of the element to search
 * @param indexEntitySearchType index of the Related Id for the filter
 * @param indexFilters indexes to include in the filter
 * @param maxFacets max number of facets.
 * @param searchTypeData  data for the filter, see the class. 
 */
function* getOptionFromSearchType({
  index,
  key,
  url,
  indexMainEntity,
  indexEntitySearchType,
  indexFilters,
  maxFacets,
  searchTypeData} : actionFilterTypes.GetSearchFilterTypesAction) {

  // llamar a reducer para actualizar el FilterOptionsContainer.

  try {
    yield put(actionFilterCreators.GetSearchFilterTypesRequest());

    //reemplazar por reducer, si es nulo, inicializar
    let container: FilterOptionsContainer = emptyContainer(indexEntitySearchType);

    if (searchTypeData.kind === "RelatedCategory" || (searchTypeData as IndexEntityName).dataDependant) {
      const facetsResult = yield call(FacetEntitySearch, url, key, index, indexFilters, maxFacets, "RelatedIds", "", indexMainEntity);
      const facetTypes = facetsResult as FacetContainer;
      const relatedContainer = container.filterEntities.get(indexEntitySearchType) as FilterEntityContainer;
      console.log("withoutIds", relatedContainer);
      if (relatedContainer.idCollection.length == 0) {
        container = setIdsFilterOptionsContainer(container, indexEntitySearchType, facetTypes);
      }
      console.log("filled?", relatedContainer);

      var filterIds = `Id eq '${relatedContainer.idCollection.map(s => s.value).join("' or Id eq '")}'`;

      
      let join = `${filterIds} and  EntityIndex eq ${indexEntitySearchType} and RelatedProperties/any(element : element/PropertyIndex eq ${searchTypeData.propertyIndex})`;

      
      let select = searchTypeData.kind === "Related" ? 'Id, RelatedProperties/PropertyIndex, RelatedProperties/Value' : "Id, RelatedProperties/PropertyIndex, RelatedProperties/Value, RelatedIds/EntityIndex, RelatedIds/EntityId";



      const resultName: IResult = yield call(EntitySearch,url, key, index, 1, maxFacets, join, "", select);



      if (searchTypeData.kind == "Related") {

        container = setRelatedIdsFilter(container, indexEntitySearchType, searchTypeData.propertyIndex, resultName.entities);

      } else {
        const category = searchTypeData as IndexEntityRelatedIdCategory;
        container = setRelatedIdsFilter(container, indexEntitySearchType, category.propertyIndex, resultName.entities, category.entityIndexCategory);
        const catEntities = container.filterEntities.get(indexEntitySearchType) as FilterEntityContainer;
        const entityCategories = (catEntities.PropertyCollection as Map<number, EntityIndexNameCategoryResult[]>).get(category.propertyIndex) as EntityIndexNameCategoryResult[];
        var results = yield call(getNames, entityCategories, category, key, url, index);
        (catEntities.PropertyCollection as Map<number, EntityIndexNameCategoryResult[]>).set(category.propertyIndex, results);
        container.filterEntities.set(indexEntitySearchType, catEntities);
      }

    } else {
      var facets = yield call(FacetWithProperty,url, key, index, indexEntitySearchType, searchTypeData.propertyIndex, maxFacets, "");

      container = setRelatedIdsFilterFromFacets(container, indexEntitySearchType, searchTypeData.propertyIndex, facets);
    }
    console.log(container);
    yield put(actionFilterCreators.GetSearchFilterTypesSuccess(container, indexMainEntity));

  } catch (error) {
    yield put(actionFilterCreators.GetSearchFilterTypesFailure(error.response.data.error));
  }
}



export function* watchOnSearchTypes() {
  // toma todas las llamadas, puede usar TakeLatest, que cancela las llamadas que se están procesando
  yield takeEvery(actionFilterTypes.GET_SEARCH_TYPES, getOptionFromSearchType);
}








