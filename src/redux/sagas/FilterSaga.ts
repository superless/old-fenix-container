import { EntityIndexNameCategoryResult, IndexEntityRelatedIdCategory, FilterEntityContainer, FacetContainer, IndexEntityName, FilterOptionsContainer } from "../../model/CategoryEntity";
import { put, call, takeEvery, select} from "redux-saga/effects";
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
import { IFilterState } from "../reducer/FilterReducer";



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

    // const thingsFromReduxStore = yield select(state => state.collection);
    const currentStore: IFilterState = yield select(state => state.filter as IFilterState);
    

    
    let container: FilterOptionsContainer | undefined;

    if (indexMainEntity){
      container = currentStore.Indexes.get(indexMainEntity);
    } else {
      container = currentStore.Main;
    }
    
    const indexRelated = indexEntitySearchType as number;

    container =  container??emptyContainer(indexRelated);

    if (searchTypeData.kind === "RelatedCategory" || (searchTypeData as IndexEntityName).dataDependant) {
      const facetsResult = yield call(FacetEntitySearch, url, key, index, indexFilters, maxFacets, "rel", "", indexMainEntity);
      
      const facetTypes = facetsResult as FacetContainer;
      
      let relatedContainer = container.filterEntities.get(indexRelated) as FilterEntityContainer;
      
      if (relatedContainer.idCollection.length == 0) {
        container = setIdsFilterOptionsContainer(container, indexRelated, facetTypes);
      }

      relatedContainer = container.filterEntities.get(indexRelated) as FilterEntityContainer;
      

      var filterIds = `id eq '${relatedContainer.idCollection.map(s => s.value).join("' or id eq '")}'`;

      
      let join = `${filterIds} and  entityIndex/any(element : element eq ${indexEntitySearchType}) and str/any(element : element/propertyIndex eq ${searchTypeData.propertyIndex})`;

      
      let select = searchTypeData.kind === "Related" ? 'id, str/propertyIndex, str/value' : "id, str/propertyIndex, str/value, rel/entityIndex, rel/entityId";


      
      const resultName: IResult = yield call(EntitySearch,url, key, index, 1, maxFacets, join, "", select);

      
      if (searchTypeData.kind == "Related") {

        container = setRelatedIdsFilter(container, indexRelated, searchTypeData.propertyIndex, resultName.entities);

      } else {
        
        
        
        const category = searchTypeData as IndexEntityRelatedIdCategory;

        

        container = setRelatedIdsFilter(container, indexRelated, category.propertyIndex, resultName.entities, category.entityIndexCategory);

        
        const catEntities = container.filterEntities.get(indexRelated) as FilterEntityContainer;
        
        const entityCategories = (catEntities.PropertyCollection as Map<number, EntityIndexNameCategoryResult[]>).get(category.propertyIndex) as EntityIndexNameCategoryResult[];
        
        
        var results = yield call(getNames, entityCategories, category, key, url, index, maxFacets);
        
        (catEntities.PropertyCollection as Map<number, EntityIndexNameCategoryResult[]>).set(category.propertyIndex, results);
        container.filterEntities.set(indexRelated, catEntities);
      }

    } else {
      var facets = yield call(FacetWithProperty,url, key, index, indexRelated, searchTypeData.propertyIndex, maxFacets, "");
      

      container = setRelatedIdsFilterFromFacets(container, indexRelated, searchTypeData.propertyIndex, facets);
    }

    
    
    yield put(actionFilterCreators.GetSearchFilterTypesSuccess(container, indexMainEntity));

  } catch (error) {
    
    yield put(actionFilterCreators.GetSearchFilterTypesFailure(error.response.data.error));
  }
}



export function* watchOnSearchTypes() {
  // toma todas las llamadas, puede usar TakeLatest, que cancela las llamadas que se están procesando
  yield takeEvery(actionFilterTypes.GET_SEARCH_TYPES, getOptionFromSearchType);
}








