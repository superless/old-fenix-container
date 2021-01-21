import * as React from 'react';
import { Provider, connect } from 'react-redux';
import store from '../redux/store/domainStore';
import AzureInput from '../model/connection/AzureInput';


// propiedades de Fenix Provider
export interface IFenixProviderProps {
  searchConnect: AzureInput,
  isStore: boolean // si creamos o no el provider de redux
}


// datos para el context de la tabla.
export interface IFenixStoreElement {
  connect : IFenixProviderProps, // parámetros de conexión
  loadedTableComponent : Map<number, boolean>; // index de la tabla y si está en proceso de carga
}


// context para el componente.
export const  ctxt = React.createContext<IFenixStoreElement | null>(null);



// Fenix Provider, conexión a redux
export class FenixProvider extends React.Component<IFenixProviderProps> {

  public static defaultProps = {
    isStore: true
};

  // si es store usa redux, sino usa un redux externo.
  public render() {
    return this.props.isStore?(
      <ctxt.Provider value={{connect : this.props, loadedTableComponent : new Map<number, boolean>()}}>
        <Provider store={store}>
            {this.props.children}
        </Provider>
      </ctxt.Provider>
    ):
    (
      <ctxt.Provider value={{connect : this.props, loadedTableComponent : new Map<number, boolean>()}}>
            {this.props.children}
      </ctxt.Provider>
    );
  }
}






