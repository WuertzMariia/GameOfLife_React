import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/redux_store";
import AppContainer from "./App";


ReactDOM.render(
  <BrowserRouter>
<Provider store={store}>
    <AppContainer />
</Provider>
  </BrowserRouter>
,
  document.getElementById('root')
);

reportWebVitals();
