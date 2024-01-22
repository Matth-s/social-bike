import { useAppSelector } from '@/app/hooks';
import Loader from '@/components/loader/Loader';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { useGetGroupsCreatedQuery } from '@/features/groups/groupsApiSlice';
import { Navigate } from 'react-router-dom';
import GroupsList from '../../components/groups-list/GroupsList';

export default function MyGroupsPage() {
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    return <Navigate to={'/'} />;
  }

  const { data, isLoading } = useGetGroupsCreatedQuery(user.id);

  if (isLoading) {
    return <Loader />;
  }

  return <div>{data && <GroupsList groups={data} />}</div>;
}
