import './App.css';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

import SignUp from './pages/signup/signup';
import Login from './pages/login/login';



function App() {
  return (
    <div className='app_container'>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  );
}

export default App;
