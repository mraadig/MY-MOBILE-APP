import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import ErrorPage from './components/Errorpage';
import Login from './components/Login';
import Signup from './components/Signup';
import PostLogin from './components/PostLogin'; // Import the PostLogin component
import App from './App';
import Tracking from './components/Tracking'; // Import the Tracking component if it exists

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'post-login',
        element: <PostLogin />,
      },
      {
        path: 'tracking',
        element: <Tracking />,
      },
    ],
  },
]);

export default router;
