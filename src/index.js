import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.css';
import reportWebVitals from './reportWebVitals';
import CounterContextProvider from './Context/Counter';

ReactDOM.render(
  <React.StrictMode>
    <CounterContextProvider>
    <App />
    </CounterContextProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

