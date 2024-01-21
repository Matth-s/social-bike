import { useAppSelector } from '@/app/hooks';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { groupRideInterface } from '@/types/group';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useCreateGroupMutation } from '../groupsApiSlice';

import './styles.scss';

export default function CreateGroup() {
  const user = useAppSelector(selectCurrentUser);
  const [postGroup, { isLoading }] = useCreateGroupMutation();

  if (!user) {
    return (
      <>
        <Navigate to={'/'} />
      </>
    );
  }

  const values: groupRideInterface = {
    id: '',
    name: '',
    owner: user.username,
    ownerId: user.id,
    members: [],
    chat: [],
    rides: [],
    city: 'Pau',
    type: 'ouvert',
    description: '',
    sport: [],
    createdAt: 0,
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    values,
  });

  async function mySubmit(group: groupRideInterface) {
    await postGroup(group)
      .unwrap()
      .then((response) => {
        console.log(response);
        reset();
      })
      .catch((error) => {
        setError('root', {
          type: 'server',
          message: error,
        });
      });
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

        {errors.root?.message && (
          <p className="root-error">{errors.root.message}</p>
        )}

        <input
          className={`btn btn__purple ${isLoading ? 'loading' : ''}`}
          type="submit"
          value="Créer"
        />
      </form>
    </div>
  );
}
