import { useForm } from 'react-hook-form';
import { groupParamsInterface } from '@/types/group';
import { useSearchParams } from 'react-router-dom';

import './styles.scss';

type Props = {
  params: groupParamsInterface;
};

export default function SearchbarGroups({ params }: Props) {
  const [setSearchParams] = useSearchParams();

  const { limit, name, filtre } = params;

  const values: groupParamsInterface = {
    filtre,
    name,
    limit,
  };

  const { register, watch, handleSubmit } = useForm({
    values,
  });

  const filter = watch('filtre');

  async function mySubmit(formParams: groupParamsInterface) {
    formParams.name =
      formParams.name !== ''
        ? formParams.name.replaceAll(' ', '-')
        : formParams.name;
    const url = Object.entries(formParams)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');

    console.log(url);
  }

  return (
    <div className="searchbar-container">
      <form
        onSubmit={handleSubmit((formParams) => mySubmit(formParams))}
      >
        <label htmlFor="filtre">Rechercher par :</label>
        <select id="filtre" {...register('filtre')}>
          <option>Aucun</option>
          <option value="groupe">Nom du groupe</option>
          <option value="ville">Ville</option>
        </select>

        <input
          type="text"
          id=""
          placeholder={` ${
            filter === 'groupe' ? 'Nom du groupe' : 'Nom de la ville'
          }`}
          {...register('name')}
        />

        <input type="submit" value={'Envoyer'} />
      </form>
    </div>
  );
}
