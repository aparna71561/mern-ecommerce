import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux'
import { store } from './app/store';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <Provider store={store}>
              <App />
              <ToastContainer position='top-right' autoClose={1500} closeOnClick/>
        </Provider>
  </React.StrictMode>
);

