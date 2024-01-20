import { useForm } from 'react-hook-form';
import { UserSigninInterface } from '../../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinValidation } from '../../../validations';
import { useSigninMutation } from '../authApiSlice';
import { useAppDispatch } from '../../../app/hooks';
import { setCredentials } from '../authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

import './styles.scss';

export default function SigninForm() {
  const [signin] = useSigninMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const values: UserSigninInterface = {
    email: '',
    password: '',
  };

  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors, isLoading },
  } = useForm({
    values,
    resolver: zodResolver(signinValidation),
  });

  async function mySubmit(credentials: UserSigninInterface) {
    await signin(credentials)
      .unwrap()
      .then((response: any) => {
        dispatch(
          setCredentials({
            user: response.user,
            token: response.token,
          })
        );
        reset();
        const from = location.state?.from || '/';

        navigate(from);
      })
      .catch((error) =>
        setError('root', {
          type: 'server',
          message: error,
        })
      );
  }

  return (
    <div className="signin-form form-container">
      <h2>Connexion</h2>
      <form
        onSubmit={handleSubmit((crendetials) =>
          mySubmit(crendetials)
        )}
      >
        <div
          className={`form-group ${
            errors.email ? 'form-group-error' : ''
          }`}
        >
          <label htmlFor="email">Email</label>
          <input type="text" id="email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div
          className={`form-group ${
            errors.password ? 'form-group-error' : ''
          }`}
        >
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            {...register('password')}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {errors.root?.message && (
          <p className="root-error">{errors.root.message}</p>
        )}

        <input
          className={`btn btn__purple ${isLoading ? 'loading' : ''}`}
          type="submit"
          value={`${isLoading ? 'Chargement ...' : 'Se connecter'}`}
        />
      </form>
    </div>
  );
}
