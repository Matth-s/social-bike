import { NavLink } from 'react-router-dom';

import './styles.scss';

export default function Navigation() {
  return (
    <ul className="groups-navigation d-flex">
      <li>
        <NavLink to={''}>Groupes</NavLink>
      </li>

      <li>
        <NavLink to={'groupes-rejoints'}>Groupes rejoints</NavLink>
      </li>

      <li>
        <NavLink to={'mes-groupes'}>Mes groupes</NavLink>
      </li>

      <li>
        <NavLink to={'creer-un-groupe'}>Créer un groupe</NavLink>
      </li>
    </ul>
  );
}
