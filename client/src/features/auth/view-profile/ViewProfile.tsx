import { UserInterface } from '@/types';
import React, { useState } from 'react';

import iconNoAvatar from '@/assets/images/icon-no-avatar.svg';
import iconEdit from '@/assets/images/icon-edit.svg';

import './styles.scss';

type Props = {
  user: UserInterface;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ViewProfile({ user, setIsEditing }: Props) {
  const { description, username, avatar } = user;

  return (
    <div className="view-profile">
      <button
        className="edit-button"
        onClick={() => setIsEditing((prev) => !prev)}
      >
        <img src={iconEdit} alt="editer le profil" />
      </button>

      <h2>Votre profil</h2>

      <img
        className="profile-img"
        src={`${avatar ? avatar : iconNoAvatar}`}
        alt="photo de profil"
      />

      <ul>
        <li>
          <h3>Nom d'utilisateur :</h3>
          <div className="text">
            <p>{username}</p>
          </div>
        </li>
        <li>
          <h3>Description :</h3>
          <div className="text">
            <p>{description}</p>
          </div>
        </li>
      </ul>

      <button>Modifier le mot de passe</button>
      <button className="btn btn__red">Supprimer le compte</button>
    </div>
  );
}
