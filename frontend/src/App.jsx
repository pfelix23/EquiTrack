import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation';
import InvestmentsPage from './components/InvestmentsPage/InvestmentsPage';
import SingleInvestmentPage from './components/SingleInvestmentPage/SingleInvestmentPage';
import UserProfilePage from './components/UserProfilePage/UserProfilePage';
import AssetsPage from './components/AssetsPage/AssetsPage';
import SingleAssetPage from './components/SingleAssetPage/SingleAssetPage';
import LiabilitiesPage from './components/LiabilitiesPage/LiabilitiesPage';
import SingleLiabilityPage from './components/SingleLiabilityPage/SingleLiabilityPage';
import LandingPage from './components/LandingPage/LandingPage';

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
        element: <LandingPage />
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
      },
      {
        path: '/assets',
        element: <AssetsPage />
      },
      {
        path: '/assets/:assetId',
        element: <SingleAssetPage />
      },
      {
        path: '/liabilities',
        element: <LiabilitiesPage />
      },
      {
        path: '/liabilities/:liabilityId',
        element: <SingleLiabilityPage />
      }
    ]
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;