import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

import App from './App';
import ProtectedRoute from './features/auth/protected-route/ProtectedRoute';

const SignupPage = lazy(
  () => import('./pages/signup-page/SignupPage')
);
const SigninPage = lazy(
  () => import('./pages/signin-page/SigninPage')
);
const HomePage = lazy(() => import('./pages/home-page/HomePage'));

const ProfilePage = lazy(
  () => import('./pages/profile-page/ProfilePage')
);
const ViewProfilePage = lazy(
  () =>
    import(
      './pages/profile-page/page/view-profile-page/ViewProfilePage'
    )
);
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'inscription',
        element: <SignupPage />,
      },
      {
        path: 'connexion',
        element: <SigninPage />,
      },
      {
        path: 'profil',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <ViewProfilePage />,
          },
          {
            path: 'abonnements',
            element: <p>Liste des abonnements</p>,
          },
          {
            path: 'abonnés',
            element: <p>Liste des abnonés</p>,
          },
          {
            path: 'invitations',
            element: <p>Invitation</p>,
          },
        ],
      },
    ],
  },
]);
