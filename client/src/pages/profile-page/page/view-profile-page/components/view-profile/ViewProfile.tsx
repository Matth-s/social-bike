import { UserInterface } from '../../../../../../types';

import './styles.scss';

type Props = {
  user: UserInterface;
};

export default function ViewProfile({ user }: Props) {
  const { description, username, avatar } = user;

  return (
    <div className="view-profile">
      <div>
        <h2>Votre profil</h2>
      </div>
      <p>Nom d'utilisateur: {username}</p>
      <p>Photo de profil: {avatar}</p>
      <p>Description: {description}</p>
      <button>Modifier le mot de passe</button>
    </div>
  );
}
