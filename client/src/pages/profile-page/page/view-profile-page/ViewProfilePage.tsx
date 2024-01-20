import { useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { selectCurrentUser } from '../../../../features/auth/authSlice';

import ViewProfile from '@/features/auth/view-profile/ViewProfile';
import EditProfile from '@/features/auth/edit-profile/EditProfile';

export default function ViewProfilePage() {
  const user = useAppSelector(selectCurrentUser);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div>
      {user && (
        <>
          {isEditing ? (
            <EditProfile user={user} setIsEditing={setIsEditing} />
          ) : (
            <ViewProfile user={user} setIsEditing={setIsEditing} />
          )}
        </>
      )}
    </div>
  );
}
