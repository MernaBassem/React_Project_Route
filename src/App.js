
import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Router';
import { TokenContext } from './Context/Token';

function App() {
  let {setToken}=useContext(TokenContext)
  useEffect(()=>{
    if(localStorage.getItem('userToken') !=null ){
      setToken(localStorage.getItem('userToken') )
    }
  },[])
  return (
    <>
  
    <BrowserRouter>
    
    <Router />
    </BrowserRouter>

        
   
    </>
  );
}

export default App;
