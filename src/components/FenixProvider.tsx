import * as React from 'react';
import { Provider, connect } from 'react-redux';
import store from '../redux/store/domainStore';
import AzureInput from '../model/connection/AzureInput';

export interface IFenixProviderProps {
  searchConnect: AzureInput,
  isStore:boolean
}

export interface IFenixStoreElement {
  connect : IFenixProviderProps,
  loadedTableComponent : Map<number, boolean>;
}

export const  ctxt = React.createContext<IFenixStoreElement | null>(null);


export class FenixProvider extends React.Component<IFenixProviderProps> {

  /**
   *
   */
  constructor(props : IFenixProviderProps) {
    super({...props, isStore : true});

  }
  public render() {
    return (
      this.props.isStore?<ctxt.Provider value={{connect : this.props, loadedTableComponent : new Map<number, boolean>()}}>
        <Provider store={store}>
            {this.props.children}
        </Provider>
      </ctxt.Provider>:
      <ctxt.Provider value={{connect : this.props, loadedTableComponent : new Map<number, boolean>()}}>
          {this.props.children}
    </ctxt.Provider>
    );
  }
}






