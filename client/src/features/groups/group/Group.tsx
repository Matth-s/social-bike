import { groupRideInterface } from '@/types';
import { useAppSelector } from '@/app/hooks';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

import './styles.scss';
import {
  useAskToJoinGroupMutation,
  useJoinGroupMutation,
} from '../groupsApiSlice';

type Props = {
  group: groupRideInterface;
};

export default function Group({ group }: Props) {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    city = 'Non précisé',
    type,
    sport,
    owner,
    members,
    ownerId,
    waitingList,
  } = group;

  const [askToJoin, { isLoading: isLoadingAsk }] =
    useAskToJoinGroupMutation();
  const [join, { isLoading: loadingJoin }] = useJoinGroupMutation();

  function checkUser() {
    if (!user) {
      navigate('/connexion', { state: { from: location } });
    }
  }

  async function handleAskToJoin(id: string) {
    if (user)
      await askToJoin({
        user: {
          username: user.username,
          id: user.id,
        },
        groupId: id,
      })
        .unwrap()
        .then((response: any) => console.log(response))
        .catch((error: any) => console.log(error));
  }

  async function handleJoin(id: string) {
    if (user) {
      await join({
        groupId: id,
        user: {
          username: user.username,
          id: user.id,
        },
      })
        .unwrap()
        .then((response: any) => console.log(response))
        .catch((error) => console.log(error));
    }
  }

  const renderButton = () => {
    if (user) {
      if (ownerId === user.id) {
        return (
          <button
            className="btn btn__blue-dark"
            onClick={() => console.log('navigate to')}
          >
            Afficher mon groupe
          </button>
        );
      }
    }

    if (user && members.find((member) => member.id === user.id)) {
      return (
        <button
          className="btn btn__blue-dark"
          onClick={() => {
            console.log('afficher le groupe');
          }}
        >
          Afficher
        </button>
      );
    }

    if (type === 'ouvert') {
      return (
        <button
          className="btn btn__blue-dark"
          onClick={() => {
            checkUser(), handleJoin(group.id);
          }}
        >
          Rejoindre
        </button>
      );
    } else if (type === 'invitation') {
      return (
        <button
          className="btn btn__blue-dark"
          onClick={() => {
            checkUser(), handleAskToJoin(group.id);
          }}
        >
          {user
            ? waitingList.find((list) => list.id === user.id)
              ? 'En attente'
              : 'Demander à rejoindre'
            : 'Demander à rejoindre'}
        </button>
      );
    }
  };

  return (
    <article className="group-container">
      <h2>{group.name}</h2>

      <div className="d-flex d-flex__alignCenter d-flex__space-aroud">
        <ul>
          <li>Localisation : {city}</li>
          <li>Sport : {sport}</li>
          <li>Créateur : {owner}</li>
          <li>Nombre de membres : {members.length}</li>
        </ul>

        {renderButton()}
      </div>
    </article>
  );
}
