import { NavLink } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <h3>Cette page n'existe pas</h3>
      <NavLink to={'/'}>
        <button>Revenir à l'accueil</button>
      </NavLink>
    </div>
  );
}
