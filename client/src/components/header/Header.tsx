import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  logout,
  selectCurrentUser,
} from '../../features/auth/authSlice';
import { NavLink } from 'react-router-dom';
import { useSignoutMutation } from '../../features/auth/authApiSlice';

import iconNoAvatar from '../../assets/images/icon-no-avatar.svg';

import './styles.scss';

export default function Header() {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [signout] = useSignoutMutation();

  async function handleSignout() {
    await signout(null);
    dispatch(logout());
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to={''}>Accueil</NavLink>
          </li>
          <li>
            <NavLink to={'/groupes'}>Groupes</NavLink>
          </li>
          <li>
            <NavLink to={'/sorties'}>Sorties</NavLink>
          </li>
        </ul>

        <div>
          {user ? (
            <>
              <NavLink to={'/profil'}>
                <img
                  className="profile-img"
                  src={`${user.avatar ? user.avatar : iconNoAvatar}`}
                  alt="photo de profil"
                />
              </NavLink>
              <button
                className="btn btn__red"
                onClick={handleSignout}
              >
                Se deconnecter
              </button>
            </>
          ) : (
            <>
              <li>
                <NavLink to={'connexion'}>Se connecter</NavLink>
              </li>
              <li>
                <NavLink to={'inscription'}>S'inscrire</NavLink>
              </li>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
