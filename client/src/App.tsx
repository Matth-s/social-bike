import { Outlet } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { useGetCurrentUserQuery } from './features/auth/authApiSlice';
import { useAppDispatch } from './app/hooks';
import { setCredentials } from './features/auth/authSlice';

import Header from './components/header/Header';
import { userResponseInterface } from './types';

function App() {
  const dispatch = useAppDispatch();

  const { data, isLoading, isSuccess } = useGetCurrentUserQuery(null);

  useEffect(() => {
    if (!isLoading && isSuccess && data) {
      const userData: userResponseInterface =
        data as userResponseInterface;
      dispatch(
        setCredentials({
          user: userData.user,
          token: userData.token,
        })
      );
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
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
