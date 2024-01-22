import SearchbarGroups from '@/pages/groups-page/components/searchbar-groups/SearchbarGroups';
import GroupsList from '../../components/groups-list/GroupsList';

import { checkGroupsParams } from '@/helpers/checkGroupsParams';
import { groupParamsInterface } from '@/types/group';
import { useSearchParams } from 'react-router-dom';
import { useGetGroupsQuery } from '@/features/groups/groupsApiSlice';
import Loader from '@/components/loader/Loader';

export default function GroupsListPage() {
  let [searchParams] = useSearchParams();

  const paramsFormat: groupParamsInterface = checkGroupsParams(
    Object.fromEntries(searchParams)
  );

  const { limit, name, filtre } = paramsFormat;

  const { data, isLoading } = useGetGroupsQuery({
    limit,
    name,
    filtre,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <SearchbarGroups params={paramsFormat} />
      {data && <GroupsList groups={data} />}
    </div>
  );
}
