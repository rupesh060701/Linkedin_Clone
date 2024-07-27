import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login';
import Header from './Components/Header';
import { getUserAuth } from './actions';
import { connect } from 'react-redux';
import { useEffect } from 'react';


function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, [])
  return (
    <div className='App'>
      <BrowserRouter>

        <Routes>
          <Route exact path='/' element={<Login />}></Route>
          <Route path='/home' element={<Header />}></Route>
        </Routes>

      </BrowserRouter>
    </div>

  );
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
