import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

import App from '@/App';
import ProtectedRoute from '@/features/auth/protected-route/ProtectedRoute';

const SignupPage = lazy(
  () => import('@/pages/signup-page/SignupPage')
);
const SigninPage = lazy(
  () => import('@/pages/signin-page/SigninPage')
);
const HomePage = lazy(() => import('@/pages/home-page/HomePage'));

const ProfilePage = lazy(
  () => import('@/pages/profile-page/ProfilePage')
);
const ViewProfilePage = lazy(
  () =>
    import(
      '@/pages/profile-page/page/view-profile-page/ViewProfilePage'
    )
);

const NotFoundPage = lazy(
  () => import('@/pages/not-found-page/NotFoundPage')
);

const GroupsPage = lazy(
  () => import('@/pages/groups-page/GroupsPage')
);
const GroupsListPage = lazy(
  () =>
    import(
      '@/pages/groups-page/pages/groups-list-page/GroupsListPage'
    )
);
const JoinedGroupsPage = lazy(
  () =>
    import(
      '@/pages/groups-page/pages/joined-groups-page/JoinedGroupsPage'
    )
);
const MyGroupPage = lazy(
  () =>
    import('@/pages/groups-page/pages/my-groups-page/MyGroupsPage')
);
const CreateGroupPage = lazy(
  () =>
    import(
      '@/pages/groups-page/pages/create-group-page/CreateGroupPage'
    )
);

const RidesPage = lazy(() => import('@/pages/rides-page/RidesPage'));

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
      {
        path: 'groupes',
        element: <GroupsPage />,
        children: [
          {
            index: true,
            element: <GroupsListPage />,
          },
          {
            path: 'groupes-rejoints',
            element: (
              <ProtectedRoute>
                <JoinedGroupsPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'mes-groupes',
            element: (
              <ProtectedRoute>
                <MyGroupPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'creer-un-groupe',
            element: (
              <ProtectedRoute>
                <CreateGroupPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: 'sorties',
        element: <RidesPage />,
        children: [
          {
            index: true,
            element: <p>page ride</p>,
          },
          {
            path: 'sorties-rejointes',
            element: <p>sorties rejointes</p>,
          },
          {
            path: 'creer-une-sortie',
            element: <p>créer une sortie</p>,
          },
          {
            path: 'mes-sorties',
            element: <p>mes sorties</p>,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
