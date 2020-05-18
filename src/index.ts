import {FenixProvider} from './components/FenixProvider';
import TableSearchFenix from './components/Table/TableSearchFenix.Container';
import SearchFilterFenix from './components/Search/SearchFilterFenix.Container';
import { watchOnLoadTable } from './redux/sagas/TableFenix';
import { EntityTableReducer } from './redux/reducer/TableFenix';
import isLoadingReducer from './redux/reducer/isLoadingReducer';
import errorReducer from './redux/reducer/errorReducer';



// muestra integración contínua.
export { TableSearchFenix, FenixProvider,  SearchFilterFenix, watchOnLoadTable, EntityTableReducer, isLoadingReducer, errorReducer};
