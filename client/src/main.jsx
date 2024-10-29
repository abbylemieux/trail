import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core'; // Import MantineProvider
import YourTrails from './components/YourTrails.jsx'
import App from './App.jsx';
import LandingPage from './landingPage.jsx';
import Register from './components/Register.jsx';
import SignIn from './components/signIn.jsx';
import Quiz from './quiz.jsx';
import BrowseTrails from './browseTrails.jsx'
import SuggestedTrails from './SuggestedTrails.jsx';

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
      },
      {
        path: 'for-you',
        element: <SuggestedTrails />
      },
      {
        path: 'your-trails',
        element: <YourTrails />
      },
      {
        path: 'browse-trails',
        element: <BrowseTrails />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider>
    <RouterProvider router={router} />
  </MantineProvider>
);