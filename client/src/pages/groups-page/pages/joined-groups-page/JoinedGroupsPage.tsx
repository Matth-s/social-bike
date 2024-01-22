import { checkGroupsParams } from '@/helpers/checkGroupsParams';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchbarGroups from '../../components/searchbar-groups/SearchbarGroups';
import { useGetGroupsJoinedQuery } from '@/features/groups/groupsApiSlice';
import { useAppSelector } from '@/app/hooks';
import { selectCurrentUser } from '@/features/auth/authSlice';
import Loader from '@/components/loader/Loader';
import GroupsList from '../../components/groups-list/GroupsList';

export default function JoinedGroupsPage() {
  let [searchParams] = useSearchParams();
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    return <></>;
  }

  const formatedParams = checkGroupsParams(
    Object.fromEntries(searchParams)
  );

  const { limit, name, filtre } = formatedParams;

  const { data, isLoading } = useGetGroupsJoinedQuery({
    limit,
    name,
    filtre,
    userId: user.id,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <SearchbarGroups params={formatedParams} />
      {data && <GroupsList groups={data} />}
    </div>
  );
}
