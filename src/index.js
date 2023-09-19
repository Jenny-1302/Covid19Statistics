import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App } from './App';
import LinesChart from './charts/LinesChart';
import BarChart from './charts/BarChart';


const router = createBrowserRouter([
  {
      path: '/',
      element: <App />,
      errorElement: <h1>404 Not Found</h1>,
  },
  {
      path: '/lines-chart',
      element: <LinesChart />,
  },
  {
      path: '/bar-chart',
      element: <BarChart />,
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

