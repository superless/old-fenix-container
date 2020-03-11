import * as React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store/domainStore';
import NestedTableFenix from './NestedTableFenixProps.Container';


export interface ITableFenixProps {
   urlAzure:string;
   azureKey:string;
   index:string;
   entity:number;
}

export default function TableFenix (props: ITableFenixProps) {
   
  return (
    <Provider store={store}>
        <NestedTableFenix {...props}  />
    </Provider>
  );
}
