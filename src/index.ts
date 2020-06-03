import {FenixProvider} from './components/FenixProvider';
import TableSearchFenix from './components/Table/TableSearchFenix.Container';

import { watchOnLoadTable } from './redux/sagas/TableFenix';
import { EntityTableReducer } from './redux/reducer/TableFenix';
import isLoadingReducer from './redux/reducer/isLoadingReducer';
import errorReducer from './redux/reducer/errorReducer';



// muestra integración contínua.
export { TableSearchFenix, FenixProvider, watchOnLoadTable, EntityTableReducer, isLoadingReducer, errorReducer};
