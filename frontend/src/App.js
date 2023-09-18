import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import { loadUser } from './Actions/User';
import Navbar from './components/Header/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Account from './components/Account/Account';
import NewPost from './components/NewPost/NewPost';
import Register from './components/Register/Register';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import ChangePassword from './components/ChangePassword/ChangePassword';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import UserProfile from './components/UserProfile';
import Search from './components/Search/Search';
import './App.css'
import Error404 from './components/Error404/Error404';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])
  const { isAuthenticated } = useSelector(state => state.user)
  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route exact path='/' element={isAuthenticated ? <Home /> : <Login />} />
        <Route exact path='/account' element={isAuthenticated ? <Account /> : <Login />} />
        <Route exact path='/newpost' element={isAuthenticated ? <NewPost /> : <Login />} />
        <Route exact path='/register' element={isAuthenticated ? <Home /> : <Register />} />
        <Route exact path='/updateProfile' element={isAuthenticated ? <UpdateProfile /> : <Login />} />
        <Route exact path='/changePassword' element={isAuthenticated ? <ChangePassword /> : <Login />} />
        <Route exact path='/forgotPassword' element={isAuthenticated ? <Home /> : <ForgotPassword />} />
        <Route exact path='/resetpassword/:token' element={isAuthenticated ? <Home /> : <ResetPassword />} />
        <Route exact path='/user/:id' element={isAuthenticated ? <UserProfile /> : <Login />} />
        <Route exact path='/search' element={isAuthenticated ? <Search /> : <Login />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </Router >
  );
}

export default App;
// learn difference between req.query and req.params