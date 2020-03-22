import * as React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store/domainStore';
import NestedTableFenix from './Table/TableSearchFenix.Container';
import SearchFilterFenix from './Search/SearchFilterFenix';



export interface IFenixProviderProps {
}

export default class FenixProvider extends React.Component<IFenixProviderProps> {
  public render() {
    return (
      <Provider store={store}>
      {this.props.children}
    </Provider>
    );
  }
}






