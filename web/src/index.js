import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ContextProvider from './context/context';

import { BrowserRouter } from 'react-router-dom' //Importing Router


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>
);

reportWebVitals();
