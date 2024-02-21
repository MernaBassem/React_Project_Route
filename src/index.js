import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import reportWebVitals from './reportWebVitals';
import CounterContextProvider from './Context/Counter';
import TokenContextProvider from './Context/Token';

ReactDOM.render(
  <React.StrictMode>
    <CounterContextProvider>
      <TokenContextProvider>
      <App />
      </TokenContextProvider>

    </CounterContextProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

