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
    let ignore = false;

    const syncAuthState = async () => {
      try {
        const userData = await authService.getCurrentuser();

        if (ignore) {
          return;
        }

        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        if (ignore) {
          return;
        }

        const isUnauthenticated = error?.code === 401 || error?.type === 'user_unauthorized';

        if (!isUnauthenticated) {
          console.error('App :: getCurrentuser failed', error);
        }

        dispatch(logout());
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    syncAuthState();

    return () => {
      ignore = true;
    };
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
