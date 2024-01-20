import { useAppSelector } from '../../../../app/hooks';
import { selectCurrentUser } from '../../../../features/auth/authSlice';

import ViewProfile from './components/view-profile/ViewProfile';

export default function ViewProfilePage() {
  const user = useAppSelector(selectCurrentUser);

  console.log(user);

  return (
    <div>
      {user && (
        <>
          <ViewProfile user={user} />
        </>
      )}
    </div>
  );
}
