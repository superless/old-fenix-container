import * as React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store/domainStore';
import { AzureInput } from '../redux/actionTypes/AzureInput';

export interface IFenixProviderProps {
  searchConnect: AzureInput
}

export const  ctxt = React.createContext<IFenixProviderProps | null>(null);


export class FenixProvider extends React.Component<IFenixProviderProps> {
  public render() {
    return (
      <Provider store={store}>
          <ctxt.Provider value={this.props}>
          {this.props.children}
          </ctxt.Provider>
      </Provider>
    );
  }
}






