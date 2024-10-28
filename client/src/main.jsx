import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core'; // Import MantineProvider

import App from './App.jsx';
import LandingPage from './landingPage.jsx';
import Register from './components/Register.jsx';
import SignIn from './components/signIn.jsx';
import Quiz from './quiz.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'sign-up',
        element: <Register />,
      },
      {
        path: 'log-in',
        element: <SignIn />,
      },
      {
        path: 'quiz',
        element: <Quiz />
      }  
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider>
    <RouterProvider router={router} />
  </MantineProvider>
);