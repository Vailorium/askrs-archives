import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faEdit,
  faEye,
  faTrash,
  faEyeSlash,
  faPlusCircle,
  faSave,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';

library.add(fab, faEdit);
library.add(fab, faTrash);
library.add(fab, faEye);
library.add(fab, faEyeSlash);
library.add(fab, faPlusCircle);
library.add(fab, faSave);
library.add(fab, faTimes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
