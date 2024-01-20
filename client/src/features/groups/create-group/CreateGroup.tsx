import { useAppSelector } from '@/app/hooks';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { groupRideInterface } from '@/types/group';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import './styles.scss';

export default function CreateGroup() {
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    return (
      <>
        <Navigate to={'/'} />
      </>
    );
  }

  const values: groupRideInterface = {
    name: '',
    owner: user.username,
    ownerId: user.id,
    members: [],
    chat: [],
    rides: [],
    city: '',
    type: 'ouvert',
    description: '',
    sport: [],
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    values,
  });

  async function mySubmit(group: groupRideInterface) {
    console.log(group);
  }

  return (
    <div className="create-group-form form-container">
      <h2>Créer un groupe</h2>

      <form onSubmit={handleSubmit((group) => mySubmit(group))}>
        <div className="form-group">
          <label htmlFor="name">Nom du groupe</label>
          <input type="text" id="name" {...register('name')} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register('description')}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="city">Ville</label>
          <input type="text" id="city" {...register('city')} />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type du groupe</label>
          <select id="type" {...register('type')}>
            <option value="ouvert">Ouvert</option>
            <option value="invitation">Sur invitation</option>
            <option value="ferme">Fermé</option>
          </select>
        </div>

        <input
          className="btn btn__purple"
          type="submit"
          value="Créer"
        />
      </form>
    </div>
  );
}
