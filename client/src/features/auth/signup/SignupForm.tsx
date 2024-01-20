import { useForm } from 'react-hook-form';
import { UserSignupInterface } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupValidation } from '@/validations';
import {
  usePostAvatarMutation,
  useSignupMutation,
} from '../authApiSlice';
import { useAppDispatch } from '@/app/hooks';
import { setCredentials } from '../authSlice';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import iconHidePassword from '@/assets/images/icon-hide-password.svg';
import iconShowPassword from '@/assets/images/icon-show-password.svg';

import './styles.scss';

export default function SignupForm() {
  const [signup] = useSignupMutation();
  const [postAvatar] = usePostAvatarMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const values: UserSignupInterface = {
    email: '',
    password: '',
    username: '',
    avatar: null,
    description: '',
  };

  const {
    handleSubmit,
    formState: { errors, isLoading },
    register,
    watch,
    setValue,
    reset,
    setError,
  } = useForm({
    values,
    resolver: zodResolver(signupValidation),
  });

  const avatar = watch('avatar');

  async function submit(credentials: UserSignupInterface) {
    if (credentials.avatar) {
      const avatar = await postAvatar(credentials.avatar[0]).unwrap();
    }

    await signup(credentials)
      .unwrap()
      .then((response: any) => {
        dispatch(
          setCredentials({
            user: response.user,
            token: response.token,
          })
        );
        reset();
        navigate('/profil');
      })
      .catch((error) =>
        setError('root', {
          type: 'server',
          message: error,
        })
      );
  }

  return (
    <div className="signup-container form-container">
      <h2>Inscription</h2>
      <form
        onSubmit={handleSubmit((user) => submit(user))}
        encType="multipart/form-data"
      >
        <div
          className={`form-group ${
            errors.email ? 'form-group-error' : ''
          }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            autoComplete="on"
            {...register('email')}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div
          className={`form-group ${
            errors.username ? 'form-group-error' : ''
          }`}
        >
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            autoComplete="on"
            {...register('username')}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div
          className={`form-group ${
            errors.avatar ? 'form-group-error' : ''
          }`}
        >
          <label htmlFor="avatar">Photo de profil</label>

          {avatar ? (
            <>
              <button
                type="button"
                className="delete-avatar"
                onClick={() => setValue('avatar', null)}
              >
                X
              </button>
              <img
                className="image-preview"
                height={60}
                width={60}
                src={URL.createObjectURL(avatar[0])}
                alt="Avatar Preview"
              />
            </>
          ) : (
            <input
              type="file"
              id="avatar"
              {...register('avatar')}
              accept="image/*"
            />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            {...register('description')}
            id="description"
          ></textarea>
        </div>

        <div
          className={`form-group ${
            errors.password ? 'form-group-error' : ''
          }`}
        >
          <label htmlFor="password">Mot de passe</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            {...register('password')}
          />
          <button
            type="button"
            className="password-button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <img
              src={showPassword ? iconHidePassword : iconShowPassword}
              alt="image"
            />
          </button>
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {errors.root?.message && (
          <p className="root-error">{errors.root.message}</p>
        )}

        <input
          className={`btn btn__purple ${isLoading ? 'loading' : ''}`}
          type="submit"
          value={`${isLoading ? 'Chargement ...' : "S'inscrire"}`}
        />
      </form>

      <p className="redirect">
        Déjà inscrit ?{' '}
        <NavLink to={'/connexion'}>Connectez-vous</NavLink>
      </p>
    </div>
  );
}
