import React from 'react';

import { useForm } from 'react-hook-form';
import { UserInterface } from '@/types';

import iconArrowLeft from '@/assets/images/icon-arrow-left.svg';

import './styles.scss';

type Props = {
  user: UserInterface;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditProfile({ setIsEditing, user }: Props) {
  const { username, id, ...rest } = user;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    values: rest,
  });

  async function mySubmit(data: any) {
    console.log(data);
  }

  return (
    <div className="edit-profile">
      <button
        onClick={() => setIsEditing((prev) => !prev)}
        className="d-flex d-flex__alignCenter"
      >
        <img src={iconArrowLeft} alt="retour" />
        Retour
      </button>

      <div className="form-container">
        <h2>Modification du profil</h2>

        <form onSubmit={handleSubmit((data) => mySubmit(data))}>
          <div className="form-group">
            <label htmlFor="descritpion">Description</label>
            <textarea id="descritpion"></textarea>
          </div>

          <input
            className="btn btn__purple"
            type="submit"
            value="Modifier"
          />
        </form>
      </div>
    </div>
  );
}
