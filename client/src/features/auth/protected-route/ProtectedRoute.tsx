import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrentUser } from '../authSlice';

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const location = useLocation();
  const user = useAppSelector(selectCurrentUser);

  return (
    <>
      {user ? (
        children
      ) : (
        <Navigate to={'/connexion'} state={{ from: location }} />
      )}
    </>
  );
}
