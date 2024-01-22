import { groupRideInterface } from '@/types';

import Group from '../../../../features/groups/group/Group';

import './styles.scss';

type Props = {
  groups: groupRideInterface[];
};

export default function GroupsList({ groups }: Props) {
  return (
    <section className="groups-list-container d-flex__column">
      {groups && groups.length > 0 ? (
        groups.map((group) => <Group key={group.id} group={group} />)
      ) : (
        <p>pas de groupe</p>
      )}
    </section>
  );
}
