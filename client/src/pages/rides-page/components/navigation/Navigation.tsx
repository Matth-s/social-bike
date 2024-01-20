import { NavLink } from 'react-router-dom';

import './styles.scss';

export default function Navigation() {
  return (
    <ul className="rides-navigation d-flex">
      <li>
        <NavLink to={''}>Sorties</NavLink>
      </li>

      <li>
        <NavLink to={'sorties-rejointes'}>Sorties rejointes</NavLink>
      </li>

      <li>
        <NavLink to={'mes-sorties'}>Mes sorties</NavLink>
      </li>

      <li>
        <NavLink to={'creer-une-sortie'}>Créer une sortie</NavLink>
      </li>
    </ul>
  );
}
