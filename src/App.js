import './App.css'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import Login from './Components/Login';
import Header from './Components/Header';

import Home from './Components/Home';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>

        <Routes>
          <Route exact path='/' element={<Login />}></Route>
          <Route  path='/home' element={<Header/>}></Route>
        </Routes>

      </BrowserRouter>
    </div>

  );
}

export default App;
