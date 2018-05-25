import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';

import StoreProvider, { createStore } from './StoreProvider';
import reducer from './reducer';

const store = createStore(reducer);

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);
