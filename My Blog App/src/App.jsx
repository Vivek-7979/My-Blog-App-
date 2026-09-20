import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';

import authService from './Appwrite/Auth_service';
import { login, logout } from './Store/AuthSlice';
import { Footer, Header } from './Components/Index';
import { Outlet } from 'react-router-dom';


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentuser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        if (error?.code !== 401) {
          console.error('App :: getCurrentuser failed', error);
        }
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-500  '>
      <div className='w-full  min-h-screen flex flex-col'>
        <Header />

        <main>
          {loading ? <div className='p-8 text-center flex-1  text-white'>Loading...</div> : <Outlet />}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
