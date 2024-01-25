import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <AppWithRedux />
 </Provider>
);
/*import ReactDOM from 'react-dom/client';
import { store } from './state/store'
import { Provider } from 'react-redux'
import AppWithRedux from "./AppWithRedux";


ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>, document.getElementById('root')
)*/
