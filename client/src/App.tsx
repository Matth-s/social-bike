import { Outlet } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { useGetCurrentUserMutation } from './features/auth/authApiSlice';
import { useAppDispatch } from './app/hooks';
import { logout, setCredentials } from './features/auth/authSlice';

import Header from './components/header/Header';

function App() {
  const dispatch = useAppDispatch();
  const [appLoading, setAppLoading] = useState<boolean>(true);

  const [getUser] = useGetCurrentUserMutation();

  async function fetUser() {
    setAppLoading(true);
    await getUser(null)
      .unwrap()
      .then((response: any) => {
        dispatch(
          setCredentials({
            user: response.user,
            token: response.token,
          })
        );
      })
      .catch(() => {
        dispatch(logout());
      })
      .finally(() => setAppLoading(false));
  }

  useEffect(() => {
    fetUser();
  }, []);

  return (
    <>
      {appLoading ? (
        <p>Chargement</p>
      ) : (
        <>
          <Header />
          <Suspense>
            <Outlet />
          </Suspense>
        </>
      )}
    </>
  );
}

export default App;
