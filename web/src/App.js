// import './App.css';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import axios from 'axios';

import SignUp from './pages/signup/signup';
import Login from './pages/login/login';
import Home from './pages/home/home';
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from './context/context';





const baseUrl = "http://localhost:4444";

function App() {

  const [isLogin, setIsLogin] = useState(null);
  // const { state, dispatch } = useContext(GlobalContext);



  useEffect(() => {

    // const checkLogin = async () => {
    //   try {
    //     let resp = await axios.get(`${baseUrl}/api/v1/ping`, { withCredentials: true });
    //     dispatch({
    //       type: "USER_LOGIN",
    //     })

    //   } catch (err) {
    //     console.log(err);
    //     dispatch({
    //       type: "USER_LOGOUT",
    //     })
    //   }
    // }
    const checkLogin = async () => {
      try {
        let resp = await axios.get(`${baseUrl}/api/v1/ping`, { withCredentials: true });
        setIsLogin(false);
      } catch (error) {
        console.log(error);
        setIsLogin(false);
      }
    }



    checkLogin();
  }, []);

  return (

    <div className='app_container'>
      {
        // state.isLogin == true ? (
        isLogin == true ? (
          <>
            <nav>
              <li><Link to='/'>Home</Link></li >
              <li><Link to='/'>About</Link></li>
              <li><Link to='/'>Contact</Link></li>
            </nav >
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<div>About</div>} />
              <Route path='/contact' element={<div>Contact</div>} />

              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </>
        ) : (
          null
        )
      }
      {
        // state.isLogin == false ? (
        isLogin == false ? (
          <>
            <nav>
              <li><Link to='/signup'>Sign Up</Link></li >
              <li><Link to='/login'>Log In</Link></li>
            </nav >
            <Routes>
              <Route path='signup' element={<SignUp />} />
              <Route path='login' element={<Login />} />

              <Route path='*' element={<Navigate to='/signup' />} />
            </Routes>
          </>
        ) : (
          null
        )
      }

      {isLogin == null ? (
        <div>Loading...</div>
      ) : (null)}
    </div >
  );
}

export default App;
