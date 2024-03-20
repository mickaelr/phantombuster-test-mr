import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.tsx';
import DashboardPage from './pages/dashboard/DashboardPage.tsx';
import PhantomDetailsPage from './pages/phantom-details/PhantomDetailsPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => { return redirect("/phantoms") },
  },
  {
    path: '/phantoms/',
    element: <App />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: ':phantomId',
        element: <PhantomDetailsPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: '/error',
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
