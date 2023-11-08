import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './pages/chat';
import Auth from './pages/auth'

function App() {
  return (
    <Router>
      <div>  
              <Routes>
              <Route exact path='/login' element={<Auth/>}/>
                <Route exact path='/' element={<Chat/>}/>
              </Routes>
      </div>
    </Router>
  );
}

export default App;
