import GroupsList from '@/features/groups/groups-list/GroupsList';
import SearchbarGroups from '@/features/groups/searchbar-groups/SearchbarGroups';

import { checkGroupsParams } from '@/helpers/checkGroupsParams';
import { groupParamsInterface } from '@/types/group';
import { useSearchParams } from 'react-router-dom';

export default function GroupsListPage() {
  let [searchParams] = useSearchParams();

  const paramsFormat: groupParamsInterface = checkGroupsParams(
    Object.fromEntries(searchParams)
  );

  return (
    <div>
      <SearchbarGroups params={paramsFormat} />
      <GroupsList />
    </div>
  );
}
