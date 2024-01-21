import Loader from '@/components/loader/Loader';
import { useGetGroupsQuery } from '../groupsApiSlice';

export default function GroupsList() {
  const { data: groups, isLoading } = useGetGroupsQuery({
    limit: 10,
    name: '',
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {groups && groups.length > 0 ? (
        groups.map((group) => <p key={group.name}>{group.name}</p>)
      ) : (
        <p>pas de groupe</p>
      )}
    </div>
  );
}
