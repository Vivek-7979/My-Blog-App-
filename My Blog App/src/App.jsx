import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from './Appwrite/Auth_service';
import { login, logout } from './Store/AuthSlice';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import LoadingAnimation from './Components/LoadingAnimation';
import { Outlet } from 'react-router-dom';


function App() {
  const [isLoading, setIsLoading] = useState(true);
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
          setIsLoading(false);
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

        <main className='mb-25 '>
          {isLoading ? <LoadingAnimation className='p-8 flex-1' /> : <Outlet />}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
