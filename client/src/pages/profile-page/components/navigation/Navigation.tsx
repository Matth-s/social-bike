import { NavLink } from 'react-router-dom';

import './styles.scss';

export default function Navigation() {
  return (
    <ul className="profil-navigation">
      <NavLink to={''} end>
        <li>Mon profil</li>
      </NavLink>
      <NavLink to={'abonnements'}>
        <li>Abonnements</li>
      </NavLink>
      <NavLink to={'abonnés'}>
        <li>Abonnées</li>
      </NavLink>
      <NavLink to={'invitations'}>
        <li>Invitations</li>
      </NavLink>
    </ul>
  );
}
