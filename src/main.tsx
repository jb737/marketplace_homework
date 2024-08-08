import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './navigation/Router.tsx';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProvider from './contexts/UserContext.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
        <RouterProvider router = {router}></RouterProvider>
    </UserProvider>
    
  </React.StrictMode>,
)
