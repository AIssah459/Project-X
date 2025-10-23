import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'  ;
import './index.css';

import App from './App.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import NotFound from './NotFound.jsx';
import PostEvent from './PostEvent.jsx';
import EditEvent from './EditEvent.jsx';
import RequireAuth from './auth/RequireAuth.jsx';
import AuthProvider from './auth/AuthProvider.jsx';

const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/login', element: <AuthProvider><Login /></AuthProvider>},
  {path: '/signup', element: <Signup />},
  {path: '/postevent', element: <AuthProvider><RequireAuth>{(user) => <PostEvent user={user} />}</RequireAuth></AuthProvider>},
  {path: '/editevent', element: <AuthProvider><RequireAuth>{(user) => <EditEvent user={user} />}</RequireAuth></AuthProvider>},
  {path:'*', element: <NotFound />},
]);

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <RouterProvider router={router} />
  //</StrictMode>,
)
