import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App, AppErrorBoundary } from '~/App.jsx';

const browserRouter = createBrowserRouter([
  { path: '/', element: <App />, errorElement: <AppErrorBoundary /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={browserRouter} />
  </StrictMode>
);
