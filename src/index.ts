import {FenixProvider} from './components/FenixProvider';
import TableSearchFenix from './components/Table/TableSearchFenix.Container';
import SearchFilterFenix from './components/Search/SearchFilterFenix.Container';
import { EntityTableReducer } from './redux/reducer/TableFenix';
import { FilterReducer } from './redux/reducer/FilterReducer';
import isLoadingReducer from './redux/reducer/isLoadingReducer';
import errorReducer from './redux/reducer/errorReducer';
 

export { TableSearchFenix, FenixProvider,  SearchFilterFenix, EntityTableReducer,
  FilterReducer,
  isLoadingReducer,
  errorReducer,};
