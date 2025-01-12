import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation';
import InvestmentsPage from './components/InvestmentsPage/InvestmentsPage';
import SingleInvestmentPage from './components/SingleInvestmentPage/SingleInvestmentPage';
import UserProfilePage from './components/UserProfilePage/UserProfilePage';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1></h1>
      },
      {
        path: '/investments',
        element: <InvestmentsPage />
      },
      {
        path: '/investments/:investmentId',
        element: <SingleInvestmentPage />
      },
      {
        path: '/user',
        element: <UserProfilePage />
      }
    ]
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;