
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Router';
import TokenContextProvider from './Context/Token';

function App() {
  
  return (
    <>
    <TokenContextProvider>
    <BrowserRouter>
    
    <Router />
    </BrowserRouter>
    </TokenContextProvider>
        
   
    </>
  );
}

export default App;
