import React from 'react';
import './App.css';
import Todoform from './Components/Todoform'
import Todowrapper from './Components/Todowrapper';
import { BrowserRouter,Routes, Route } from "react-router-dom";

const App =()=>{

  
  return(
    <>

    <div className="App">
      <BrowserRouter>
      <Routes>

        <Route path='/form/:type' element={<Todoform/>} />
        <Route path='/' element={<Todowrapper/>} />

      </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App;
