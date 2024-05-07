import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import AdminHome from '../Pages/AdminHome';
import AddGames from '../Pages/AddGames';
import GamesList from '../Pages/GamesList';
import EditGame from '../Pages/EditGame';
import DemoLogin from '../Pages/AdminList';
import Header from '../components/Header';
import AdminList from '../Pages/AdminList';
import TandC from '../Pages/Terms&condition';
import AboutUs from '../Pages/AboutUs';
import PrivacyPolicy from '../Pages/PrivacyPolicy';

function AllRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("is_Admin_loggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/AdminHome' element={isLoggedIn ? <AdminHome /> : <Navigate to ="/" />} />
        <Route path='/AddGames'  element={isLoggedIn ? <AddGames /> :  <Navigate to ="/" />} />
        <Route path='/GamesList' element={isLoggedIn ? <GamesList /> : <Navigate to ="/" />} />
        <Route path='/edit/:id' element={isLoggedIn ? <EditGame /> : <Navigate to ="/" />} />
        <Route path='/adminList' element={isLoggedIn ? <AdminList /> : <Navigate to ="/" />} />
        <Route path='/t&c' element={ <TandC/> } />
        <Route path='/AboutUs' element={ <AboutUs/> } />
        <Route path='/PrivacyPolicy' element={ <PrivacyPolicy/> } />
      </Routes>
    </div>
  );
}

export default AllRoutes;
